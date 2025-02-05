package com.zon.abba.account.service;

import com.zon.abba.account.entity.PointHolding;
import com.zon.abba.account.entity.PointsHistory;
import com.zon.abba.account.entity.Wallet;
import com.zon.abba.account.repository.PointHoldingRepository;
import com.zon.abba.account.repository.PointsHistoryRepository;
import com.zon.abba.account.repository.WalletRepository;
import com.zon.abba.common.exception.CommonException;
import com.zon.abba.common.exception.NoDataException;
import com.zon.abba.commonCode.entity.CommonCode;
import com.zon.abba.commonCode.repository.CommonCodeRepository;
import com.zon.abba.member.dto.ParentTreeDto;
import com.zon.abba.member.mapping.ParentTree;
import com.zon.abba.member.repository.RecommendedMemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
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

    @Transactional
    public void makePointHistory(Wallet wallet, String receiverID, String orderDetailID,
                                  BigDecimal LP, BigDecimal AK, BigDecimal SP, boolean isUseAK){
        logger.info("판매자의 지갑을 가져옵니다.");
        Wallet receiverWallet = walletRepository.findOneByMemberId(receiverID)
                .orElseThrow(() -> new NoDataException("없는 정보입니다."));

        BigDecimal usePoint = LP;
        // ak를 사용한 후 lp 사용
        if(isUseAK) {
            // ak가 부족한 경우
            if(wallet.getAk().compareTo(usePoint) < 0) {
                usePoint = usePoint.subtract(wallet.getAk());
                wallet.setAk(BigDecimal.ZERO);
                // ak가 충분하면 ak만 쓰고 끝.
            }else wallet.setAk(wallet.getAk().subtract(usePoint));
        }
        if(wallet.getLp().compareTo(usePoint) < 0) throw new CommonException("234", "LP 금액이 부족합니다.");
        else wallet.setLp(wallet.getLp().subtract(usePoint));

        if(wallet.getSp().compareTo(SP) < 0) throw new CommonException("234", "SP 금액이 부족합니다.");
        else wallet.setSp(wallet.getSp().subtract(SP));

        // 거래 후 사용자들의 지갑에 추가
//        receiverWallet.setLp(receiverWallet.getLp().add(LP));
//        receiverWallet.setSp(receiverWallet.getSp().add(SP));
        wallet.setAk(wallet.getAk().add(AK));
        wallet.setModifiedId(wallet.getModifiedId());

        // 판매자가 받을 point holding 객체 생성
        PointHolding pointHolding = PointHolding.builder()
                .orderDetailId(orderDetailID)
                .memberId(receiverWallet.getMemberId())
                .lp(LP)
                .ak(BigDecimal.ZERO)
                .sp(SP)
                .type("A")
                .status("A")
                .createdId(wallet.getMemberId())
                .modifiedId(wallet.getMemberId())
                .build();

        // 구매자가 받을 ak 홀딩
        PointHolding akHolding = PointHolding.builder()
                .orderDetailId(orderDetailID)
                .memberId(wallet.getMemberId())
                .lp(BigDecimal.ZERO)
                .ak(AK)
                .sp(BigDecimal.ZERO)
                .type("A")
                .status("A")
                .createdId(wallet.getMemberId())
                .modifiedId(wallet.getMemberId())
                .build();

        PointsHistory pointsHistory = PointsHistory.builder()
                .memberId(wallet.getMemberId())
                .lp(LP.negate())
                .lpBalance(wallet.getLp())
                .ak(BigDecimal.ZERO)
                .akBalance(wallet.getAk())
                .sp(SP.negate())
                .spBalance(wallet.getSp())
                .type("A")
                .orderDetailId(orderDetailID)
                .createdId(wallet.getMemberId())
                .modifiedId(wallet.getMemberId())
                .build();

        // 라인에 수당 분배
        distributeAK(findParentForZone(wallet.getMemberId()), AK, orderDetailID, wallet.getMemberId());

        logger.info("거래 내역을 저장합니다.");
        pointsHistoryRepository.save(pointsHistory);
        pointHoldingRepository.save(pointHolding);
        pointHoldingRepository.save(akHolding);

    }
    // 1. 존 판매 라인 찾기
    @Transactional
    private List<ParentTreeDto> findParentForZone(String referId){
        logger.info("상위 추천인과 역할을 탐색합니다.");
        List<ParentTree> list = recommendedMemberRepository.findParentTreeWithReferredRoleForZone(referId);

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

        List<PointHolding> pointHoldings = new ArrayList<>();

        for (ParentTreeDto parent : list){
            String role = parent.getReferredRole();
            BigDecimal point = points.get(role);

            if (point != null && point.compareTo(BigDecimal.ZERO) != 0) {
                // point가 0이 아닐 때 실행
                // 구매자가 받을 ak 홀딩
                BigDecimal akPoint = point.subtract(usedAK);
                PointHolding akHolding = PointHolding.builder()
                        .orderDetailId(orderDetailID)
                        .memberId(parent.getReferredId())
                        .lp(BigDecimal.ZERO)
                        .ak(akPoint)
                        .sp(BigDecimal.ZERO)
                        .type("B")
                        .status("A")
                        .createdId(referId)
                        .modifiedId(referId)
                        .build();

                pointHoldings.add(akHolding);
                usedAK = usedAK.add(akPoint);
                points.put(role, BigDecimal.ZERO);
            }

            // 어짜피 마지막일 태니 종료
            if(role.equals("E")) break;
        }

        // 정산들 저장
        pointHoldingRepository.saveAll(pointHoldings);
    }

    @Transactional
    public void settleOrder(String orderDetailID){
        logger.info("구매확정된 주문 내역에 대한 정산을 시작합니다.");
        List<PointHolding> list = pointHoldingRepository.findByOrderDetailId(orderDetailID);

        // 정산 리스트 상태 처리 완료로 변경
        list.forEach(ph -> {
            ph.setStatus("B");
            ph.setModifiedId("admin");

            // 지갑에 돈 넣기
            logger.info(ph.getMemberId());
            Wallet wallet = walletRepository.findOneByMemberId(ph.getMemberId())
                    .orElseThrow(() -> new NoDataException("없는 지갑입니다."));
            wallet.setLp(wallet.getLp().add(ph.getLp()));
            wallet.setAk(wallet.getAk().add(ph.getAk()));
            wallet.setSp(wallet.getSp().add(ph.getSp()));
            wallet.setModifiedId(ph.getMemberId());

            // ak가 0이면 물건 판매
            String type = "";
            if(ph.getAk().compareTo(BigDecimal.ZERO) == 0) type ="A";
            else type = "B";

            PointsHistory pointsHistory = PointsHistory.builder()
                    .memberId(wallet.getMemberId())
                    .lp(ph.getLp())
                    .lpBalance(wallet.getLp())
                    .ak(ph.getAk())
                    .akBalance(wallet.getAk())
                    .sp(ph.getSp())
                    .spBalance(wallet.getSp())
                    .type(type)
                    .orderDetailId(orderDetailID)
                    .createdId(wallet.getMemberId())
                    .modifiedId(wallet.getMemberId())
                    .build();

            walletRepository.save(wallet);
            pointsHistoryRepository.save(pointsHistory);
        });

        pointHoldingRepository.saveAll(list);
    }
}
