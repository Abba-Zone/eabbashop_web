package com.zon.abba.point.service;

import com.zon.abba.point.entity.ChargeRefund;
import com.zon.abba.point.entity.PointHolding;
import com.zon.abba.point.entity.PointsHistory;
import com.zon.abba.account.entity.Wallet;
import com.zon.abba.point.entity.Transfer;
import com.zon.abba.point.repository.ChargeRefundRepository;
import com.zon.abba.point.repository.PointHoldingRepository;
import com.zon.abba.point.repository.PointsHistoryRepository;
import com.zon.abba.account.repository.WalletRepository;
import com.zon.abba.common.exception.CommonException;
import com.zon.abba.common.exception.NoDataException;
import com.zon.abba.commonCode.entity.CommonCode;
import com.zon.abba.commonCode.repository.CommonCodeRepository;
import com.zon.abba.member.dto.ParentTreeDto;
import com.zon.abba.member.mapping.ParentTree;
import com.zon.abba.member.repository.RecommendedMemberRepository;
import com.zon.abba.point.request.TransferRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PointService {

    private static final Logger logger = LoggerFactory.getLogger(PointService.class);

    private final WalletRepository walletRepository;
    private final RecommendedMemberRepository recommendedMemberRepository;
    private final CommonCodeRepository commonCodeRepository;
    private final PointsHistoryRepository pointsHistoryRepository;
    private final PointHoldingRepository pointHoldingRepository;
    private final ExchangeRateService exchangeRateService;

    /**
     *
     * @param wallet 사용자의 지갑
     * @param LP 사용한 LP
     * @param AK 사용한 AK
     * @param SP 사용한 SP
     * @param type A : OrderDetail, B : ChargeRefund, C : Transfer
     * @param id
     */
    @Transactional
    public void savePointHistory(Wallet wallet, BigDecimal LP, BigDecimal AK, BigDecimal SP, String type, String id, String memberId){
        logger.info("포인트 사용 내역을 저장합니다.");
        PointsHistory pointsHistory = PointsHistory.builder()
                .memberId(wallet.getMemberId())
                .lp(LP)
                .lpBalance(wallet.getLp())
                .ak(AK)
                .akBalance(wallet.getAk())
                .sp(SP)
                .spBalance(wallet.getSp())
                .type(type)
                .createdId(memberId)
                .modifiedId(memberId)
                .build();

        if (type.equals("A") || type.equals("D")) pointsHistory.setOrderDetailId(id);
        if (type.equals("B")) pointsHistory.setChargeRefundId(id);
        if (type.equals("C")) pointsHistory.setTransferId(id);

        pointsHistoryRepository.save(pointsHistory);
    }

    /**
     *
     * @param walletMemberId 돈을 받을 사람의 id
     * @param LP LP
     * @param AK AK
     * @param SP SP
     * @param type 거래 유형
     * @param status 현 상태
     * @param orderDetailId 주문 정보
     * @param memberId 생성한 사람
     */
    @Transactional
    public void savePointHolding(String walletMemberId, BigDecimal LP, BigDecimal AK, BigDecimal SP,
                                 String type, String status,
                                 String orderDetailId, String memberId){
        logger.info("포인트 홀딩 내역을 저장합니다.");
        PointHolding pointHolding = PointHolding.builder()
                .memberId(walletMemberId)
                .lp(LP)
                .ak(AK)
                .sp(SP)
                .type(type)
                .status(status)
                .orderDetailId(orderDetailId)
                .createdId(memberId)
                .modifiedId(memberId)
                .build();

        pointHoldingRepository.save(pointHolding);
    }

    /**
     *
     * @param wallet 사용자의 지갑
     * @param LP 사용 LP
     * @param AK 사용 AK
     * @param SP 사용 SP
     * @param type A면 입금, B면 출금
     */
    @Transactional
    public void putWallet(Wallet wallet, BigDecimal LP, BigDecimal AK, BigDecimal SP, String type, String memberId){
        logger.info("지갑에 포인트 내역을 적용합니다.");
        // 입금 시
        if(type.equals("A")){
            wallet.setLp(wallet.getLp().add(LP));
            wallet.setAk(wallet.getAk().add(AK));
            wallet.setSp(wallet.getSp().add(SP));
        }
        // 출금 시
        if(type.equals("B")){
            if(wallet.getLp().compareTo(LP) < 0) throw new CommonException("234", "LP 금액이 부족합니다.");
            if(wallet.getAk().compareTo(AK) < 0) throw new CommonException("234", "AK 금액이 부족합니다.");
            if(wallet.getSp().compareTo(SP) < 0) throw new CommonException("234", "SP 금액이 부족합니다.");

            wallet.setLp(wallet.getLp().subtract(LP));
            wallet.setAk(wallet.getAk().subtract(AK));
            wallet.setSp(wallet.getSp().subtract(SP));
        }
        wallet.setModifiedId(memberId);

        walletRepository.save(wallet);
    }

    @Transactional
    public void makePointHistory(Wallet wallet, String receiverID, String orderDetailID,
                                  BigDecimal LP, BigDecimal AK, BigDecimal SP, boolean isUseAK){
        logger.info("판매자의 지갑을 가져옵니다.");
        Wallet receiverWallet = walletRepository.findOneByMemberId(receiverID)
                .orElseThrow(() -> new NoDataException("없는 정보입니다."));

        BigDecimal useLP = LP;
        BigDecimal useAK = BigDecimal.ZERO;
        // ak를 사용한 후 lp 사용
        if(isUseAK) {
            // ak가 부족한 경우
            if(wallet.getAk().compareTo(LP) < 0) {
                // 남은 금액 = LP - ak
                useAK = wallet.getAk();
                useLP = useLP.subtract(useAK);

            }else {
                // ak가 충분하면 ak만 쓰고 끝.
                useAK = useLP;
                useLP = BigDecimal.ZERO;
            }
        }

        logger.info("거래 내역을 저장합니다.");

        // 판매자가 받을 point holding 객체 생성
        savePointHolding(receiverWallet.getMemberId(), LP, BigDecimal.ZERO, SP, "A", "A", orderDetailID, wallet.getMemberId());

        // 구매자가 받을 ak 홀딩
        savePointHolding(wallet.getMemberId(), BigDecimal.ZERO, AK, BigDecimal.ZERO, "A", "A", orderDetailID, wallet.getMemberId());

        // 거래 후 사용자들의 지갑에 추가
        putWallet(wallet, useLP, useAK, SP, "B", wallet.getMemberId());
        // 거래 내역 저장
        savePointHistory(wallet, LP.negate(), useAK.negate(), SP.negate(), "A", orderDetailID, wallet.getMemberId());

        // 라인에 수당 분배
        distributeAK(findParentForZone(wallet.getMemberId()), AK, orderDetailID, wallet.getMemberId());


    }
    // 1. 존 판매 라인 찾기
    @Transactional
    private List<ParentTreeDto> findParentForZone(String memberId){
        logger.info("상위 추천인과 역할을 탐색합니다.");
        List<ParentTree> list = recommendedMemberRepository.findParentTreeWithReferredRoleForZone(memberId);

        return list.stream().map(ParentTreeDto::new).toList();
    }

    @Transactional
    private void distributeAK(List<ParentTreeDto> list, BigDecimal AK, String orderDetailID, String referId){
        logger.info("수당을 분배합니다.");
        BigDecimal usedAK = BigDecimal.ZERO;

        List<CommonCode> commonCodes = commonCodeRepository.findActiveCommonCodesByCodeGroup("ZoneAccount");

        Map<String, BigDecimal> points = commonCodes.stream()
                .collect(Collectors.toMap(
                        CommonCode::getCode,
                        code -> new BigDecimal(code.getCodeValue()).divide(BigDecimal.valueOf(100))  // 👉 비율 변환 (소수점)
                                .multiply(AK)  // 👉 AK 값 곱하기
                ));

        for (ParentTreeDto parent : list){
            if(parent.getReferId().equals(referId)) continue;
            String role = parent.getReferRole();
            BigDecimal point = points.get(role);

            if (point != null && point.compareTo(BigDecimal.ZERO) != 0) {
                // point가 0이 아닐 때 실행
                // 구매자가 받을 ak 홀딩
                BigDecimal akPoint = point.subtract(usedAK);
                savePointHolding(parent.getReferId(), BigDecimal.ZERO, AK, BigDecimal.ZERO, "B", "A", orderDetailID, referId);

                usedAK = usedAK.add(akPoint);
                points.put(role, BigDecimal.ZERO);
            }

            // 어짜피 마지막일 태니 종료
            if(role.equals("E")) break;
        }
    }

    // 환급 시 적용
    @Transactional
    private void distributeDirectAK(List<ParentTreeDto> list, BigDecimal AK, String chargeRefundId, String memberId){
        logger.info("수당을 직접 분배합니다.");

        BigDecimal usedAK = BigDecimal.ZERO;

        List<CommonCode> commonCodes = commonCodeRepository.findActiveCommonCodesByCodeGroup("ZoneAccount");

        Map<String, BigDecimal> points = commonCodes.stream()
                .collect(Collectors.toMap(
                        CommonCode::getCode,
                        code -> new BigDecimal(code.getCodeValue()).divide(BigDecimal.valueOf(100))  // 👉 비율 변환 (소수점)
                                .multiply(AK)  // 👉 AK 값 곱하기
                ));

        for (ParentTreeDto parent : list){
            if(parent.getReferId().equals(memberId)) continue;
            String role = parent.getReferRole();
            BigDecimal point = points.get(role);

            if (point != null && point.compareTo(BigDecimal.ZERO) != 0) {
                // point가 0이 아닐 때 실행
                // 받을 ak
                BigDecimal akPoint = point.subtract(usedAK);
                // 추천인의 지갑 가져오기
                Wallet wallet = walletRepository.findOneByMemberId(parent.getReferredId())
                        .orElseThrow(() -> new NoDataException("없는 지갑 정보입니다."));

//                wallet.setAk(wallet.getAk().add(akPoint));

                // 거래 후 사용자들의 지갑에 추가
                putWallet(wallet, BigDecimal.ZERO, akPoint, BigDecimal.ZERO, "A", memberId);
                savePointHistory(wallet, BigDecimal.ZERO, akPoint, BigDecimal.ZERO, "B", chargeRefundId, memberId);

                usedAK = usedAK.add(akPoint);
                points.put(role, BigDecimal.ZERO);
//                walletRepository.save(wallet);


            }

            // 어짜피 마지막일 태니 종료
            if(role.equals("E")) break;
        }
    }

    @Transactional
    public void settleOrder(String orderDetailID){
        logger.info("구매확정된 주문 내역에 대한 정산을 시작합니다.");
        List<PointHolding> list = pointHoldingRepository.findByOrderDetailId(orderDetailID);

        // 정산 리스트 상태 처리 완료로 변경
        list.forEach(ph -> {
            if(ph.getStatus().equals("C")) return;

            ph.setStatus("B");
            ph.setModifiedId("admin");

            // 지갑에 돈 넣기
            Wallet wallet = walletRepository.findOneByMemberId(ph.getMemberId())
                    .orElseThrow(() -> new NoDataException("없는 지갑입니다."));

            // 거래 후 사용자들의 지갑에 추가
            putWallet(wallet, ph.getLp(), ph.getAk(), ph.getSp(), "A", "admin");
            savePointHistory(wallet, ph.getLp(), ph.getAk(), ph.getSp(), "A", orderDetailID, "admin");
        });

        pointHoldingRepository.saveAll(list);
    }

    // 환불 시 수당 라인 holding 삭제
    @Transactional
    public void rollbackOrderParentTree(String orderDetailID){
        // holding에 잡혀 있는 ak 라인 처리
        List<PointHolding> list = pointHoldingRepository.findByOrderDetailId(orderDetailID);

        list.forEach(ph -> {
            ph.setStatus("C");
            ph.setModifiedId("admin");
        });

        pointHoldingRepository.saveAll(list);
    }

    // 구매자에게 포인트를 돌려줄 때
    @Transactional
    public void rollbackOrderPoint(String orderDetailID, String sellerID){
        // history에 잡혀 있는 sp, ak, lp 돌려주기.
        logger.info("구매자에게 포인트를 돌려줍니다.");
        // 구매 내역 정보 가져오기
        PointsHistory pointsHistory = pointsHistoryRepository.findByOrderDetailId(orderDetailID)
                .orElseThrow(() -> new NoDataException("해당 주문에는 없는 사용 내역입니다."));

        Wallet wallet = walletRepository.findOneByMemberId(pointsHistory.getMemberId())
                .orElseThrow(() -> new NoDataException("없는 지갑 정보입니다."));

        // 포인트 내역에 있는건 음수이다.
        // 고로 양수로 바꿔줘야 한다.
        BigDecimal LP = pointsHistory.getLp().negate();
        BigDecimal AK = pointsHistory.getAk().negate();
        BigDecimal SP = pointsHistory.getSp().negate();

        // 거래 후 사용자들의 지갑에 추가
        putWallet(wallet, LP, AK, SP, "A", sellerID);
        savePointHistory(wallet, LP, AK, SP, "D", orderDetailID, sellerID);
    }

    // 충전시 돈 계산
    @Transactional
    public void chargeHistory(ChargeRefund chargeRefund){
        logger.info("충전 시 정산 내역을 남깁니다.");

        // 관리자
        Wallet senderWallet = walletRepository.findById(chargeRefund.getSenderWalletId())
                .orElseThrow(() -> new NoDataException("없는 Sender(관리자) 지갑 정보 입니다."));
        // 고객
        Wallet receiverWallet = walletRepository.findById(chargeRefund.getReceiverWalletId())
                .orElseThrow(() -> new NoDataException("없는 Receiver(고객) 지갑 정보 입니다."));

        BigDecimal LP = BigDecimal.ZERO;
        BigDecimal AK = BigDecimal.ZERO;
        BigDecimal SP = BigDecimal.ZERO;

        // 사용 금액을 계산한다.
        // 충전시에는 충전할 당시 저장된 point로 계산된다.
        if(chargeRefund.getType().equals("LP")) LP = chargeRefund.getPoint();
        if(chargeRefund.getType().equals("AK")) AK = chargeRefund.getPoint();
        if(chargeRefund.getType().equals("SP")) SP = chargeRefund.getPoint();

        // sender의 지갑에선 돈이 빠져 나간다.
        putWallet(senderWallet, LP, AK, SP, "B", receiverWallet.getMemberId());
        //receiver의 지갑에선 돈이 들어간다.
        putWallet(receiverWallet, LP, AK, SP, "A", receiverWallet.getMemberId());
        // 보내는 사람은 음수로
        savePointHistory(senderWallet, LP.negate(), AK.negate(), SP.negate(), "B", chargeRefund.getChargeRefundId(), receiverWallet.getMemberId());
        // 받는 사람은 양수로
        savePointHistory(receiverWallet, LP, AK, SP, "B", chargeRefund.getChargeRefundId(), receiverWallet.getMemberId());

    }

    // 환급시 돈 계산
    @Transactional
    public void refundHistory(ChargeRefund chargeRefund){
        logger.info("환급 시 정산 내역을 남깁니다.");

        // 고객
        Wallet senderWallet = walletRepository.findById(chargeRefund.getSenderWalletId())
                .orElseThrow(() -> new NoDataException("없는 Sender(고객) 지갑 정보 입니다."));
        // 관리자
        Wallet receiverWallet = walletRepository.findById(chargeRefund.getReceiverWalletId())
                .orElseThrow(() -> new NoDataException("없는 Receiver(관리자) 지갑 정보 입니다."));

        // 사용 금액을 계산한다.
        // 환급시에는 승인할 당시의 환율로 point가 계산된다.
        // 실제 고객의 통장에 들어갈 돈은 sellRate이다.
        BigDecimal buyRate = exchangeRateService.convertToKRW(chargeRefund.getPoint(), 0);
        BigDecimal sellRate = exchangeRateService.convertToKRW(chargeRefund.getPoint(), 1);

        chargeRefund.setAmount(sellRate);

        // 정산으로 들어가는 ak 크기는 살 때 환율 - 팔 때 환율
        BigDecimal rate = buyRate.subtract(sellRate);
        // ak를 다시 살 때 환율로 변환
        BigDecimal akPoint = exchangeRateService.convertToUSD(rate, 0);
        logger.info("받는 ak는 {}", akPoint);

        BigDecimal LP = BigDecimal.ZERO;
        BigDecimal AK = BigDecimal.ZERO;
        BigDecimal SP = BigDecimal.ZERO;

        if(chargeRefund.getType().equals("LP")) LP = chargeRefund.getPoint();
        if(chargeRefund.getType().equals("AK")) AK = chargeRefund.getPoint();
        if(chargeRefund.getType().equals("SP")) SP = chargeRefund.getPoint();

        // sender(고객)의 지갑에선 돈이 빠져 나간다.
        putWallet(senderWallet, LP, AK, SP, "B", receiverWallet.getMemberId());
        //receiver(관리자)의 지갑에선 돈이 들어간다.
        putWallet(receiverWallet, LP, AK, SP, "A", receiverWallet.getMemberId());
        // 보내는 사람은 음수로
        savePointHistory(senderWallet, LP.negate(), AK.negate(), SP.negate(), "B", chargeRefund.getChargeRefundId(), receiverWallet.getMemberId());
        // 받는 사람은 양수로
        savePointHistory(receiverWallet, LP, AK, SP, "B", chargeRefund.getChargeRefundId(), receiverWallet.getMemberId());
        // 내 지갑에 AK 추가
        putWallet(senderWallet, BigDecimal.ZERO, akPoint, BigDecimal.ZERO, "A", receiverWallet.getMemberId());
        savePointHistory(senderWallet, BigDecimal.ZERO, akPoint, BigDecimal.ZERO, "B", chargeRefund.getChargeRefundId(), receiverWallet.getMemberId());
        // 라인에 수당 분배
        distributeDirectAK(findParentForZone(senderWallet.getMemberId()), akPoint, chargeRefund.getChargeRefundId(), receiverWallet.getMemberId());
    }

    @Transactional
    public void transfer(Transfer transfer){
        logger.info("유저간 포인트를 교환합니다.");

        // 주는 사람
        Wallet senderWallet = walletRepository.findOneByMemberId(transfer.getSenderId())
                .orElseThrow(() -> new NoDataException("없는 출금 지갑 정보 입니다."));
        // 받는 사람
        Wallet receiverWallet = walletRepository.findOneByMemberId(transfer.getReceiverId())
                .orElseThrow(() -> new NoDataException("없는 입금 지갑 정보 입니다."));

        // sender(고객)의 지갑에선 돈이 빠져 나간다.
        putWallet(senderWallet, transfer.getLp(), transfer.getAk(), transfer.getSp(), "B", transfer.getSenderId());
        //receiver(관리자)의 지갑에선 돈이 들어간다.
        putWallet(receiverWallet, transfer.getLp(), transfer.getAk(), transfer.getSp(), "A", transfer.getSenderId());
        // 보내는 사람은 음수로
        savePointHistory(senderWallet,
                transfer.getLp().negate(),
                transfer.getAk().negate(),
                transfer.getSp().negate(),
                "C",
                transfer.getTransferId(),
                transfer.getSenderId());
        // 받는 사람은 양수로
        savePointHistory(receiverWallet,
                transfer.getLp(),
                transfer.getAk(),
                transfer.getSp(),
                "C",
                transfer.getTransferId(),
                transfer.getSenderId());
    }

}
