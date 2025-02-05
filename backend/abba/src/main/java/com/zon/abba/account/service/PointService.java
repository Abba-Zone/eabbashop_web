package com.zon.abba.account.service;

import com.zon.abba.account.entity.PointHolding;
import com.zon.abba.account.entity.PointsHistory;
import com.zon.abba.account.entity.Wallet;
import com.zon.abba.account.repository.PointHoldingRepository;
import com.zon.abba.account.repository.PointsHistoryRepository;
import com.zon.abba.account.repository.WalletRepository;
import com.zon.abba.common.exception.CommonException;
import com.zon.abba.common.exception.NoDataException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class PointService {

    private static final Logger logger = LoggerFactory.getLogger(PointService.class);

    private final WalletRepository walletRepository;
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
                .lp(LP)
                .lpBalance(wallet.getLp())
                .ak(BigDecimal.ZERO)
                .akBalance(wallet.getAk())
                .sp(SP)
                .spBalance(wallet.getSp())
                .type("A")
                .orderDetailId(orderDetailID)
                .createdId(wallet.getMemberId())
                .modifiedId(wallet.getMemberId())
                .build();

        logger.info("거래 내역을 저장합니다.");
        pointsHistoryRepository.save(pointsHistory);
        pointHoldingRepository.save(pointHolding);
        pointHoldingRepository.save(akHolding);

    }
}
