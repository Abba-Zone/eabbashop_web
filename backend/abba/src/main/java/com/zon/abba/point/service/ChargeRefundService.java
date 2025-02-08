package com.zon.abba.point.service;

import com.zon.abba.account.entity.Accounts;
import com.zon.abba.point.entity.ChargeRefund;
import com.zon.abba.account.entity.Wallet;
import com.zon.abba.point.repository.ChargeRefundRepository;
import com.zon.abba.account.repository.WalletRepository;
import com.zon.abba.account.request.AccountRequest;
import com.zon.abba.point.request.ChargeRequest;
import com.zon.abba.point.request.RefundRequest;
import com.zon.abba.account.service.AccountService;
import com.zon.abba.common.exception.NoDataException;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.security.JwtTokenProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class ChargeRefundService {
    private static final Logger logger = LoggerFactory.getLogger(ChargeRefundService.class);

    private final ChargeRefundRepository chargeRefundRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final WalletRepository walletRepository;
    private final AccountService accountService;

    private void setPointByType(ChargeRefund chargeRefund, String pointType, BigDecimal price){

        switch (pointType) {
            case "LP" -> {
                chargeRefund.setLp(price);
                chargeRefund.setAk(BigDecimal.ZERO);
                chargeRefund.setSp(BigDecimal.ZERO);
                chargeRefund.setAbzPoint(BigDecimal.ZERO);
            }
            case "AK" -> {
                chargeRefund.setLp(BigDecimal.ZERO);
                chargeRefund.setAk(price);
                chargeRefund.setSp(BigDecimal.ZERO);
                chargeRefund.setAbzPoint(BigDecimal.ZERO);
            }
            case "SP" -> {
                chargeRefund.setLp(BigDecimal.ZERO);
                chargeRefund.setAk(BigDecimal.ZERO);
                chargeRefund.setSp(price);
                chargeRefund.setAbzPoint(BigDecimal.ZERO);
            }
            case "ABZPoint" -> {
                chargeRefund.setLp(BigDecimal.ZERO);
                chargeRefund.setAk(BigDecimal.ZERO);
                chargeRefund.setSp(BigDecimal.ZERO);
                chargeRefund.setAbzPoint(price);
            }
        }

    }

    @Transactional
    public ResponseBody chargePoint(ChargeRequest request){
        logger.info("포인트 충전을 신청합니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        Wallet wallet = walletRepository.findOneByMemberId(memberId)
                .orElseThrow(() -> new NoDataException("없는 지갑 정보입니다."));


        ChargeRefund chargeRefund = ChargeRefund.builder()
                .accountId(request.getAccountID())
                .status(request.getStatus())
                .createdId(memberId)
                .modifiedId(memberId)
                .build();

        if(request.getStatus().equals("A")){
            chargeRefund.setReceiverWalletId(wallet.getWalletId());
        }else if(request.getStatus().equals("B")){
            chargeRefund.setSenderWalletId(wallet.getWalletId());
        }
        // 추후 환율 변동기 가져오면 적용
        BigDecimal price = BigDecimal.valueOf(request.getAmount());

        setPointByType(chargeRefund, request.getPointType(), price);

        chargeRefundRepository.save(chargeRefund);

        return new ResponseBody("성공했습니다.");
    }

    @Transactional
    public ResponseBody refundPoint(RefundRequest request){
        logger.info("포인트 환급을 신청합니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        Wallet wallet = walletRepository.findOneByMemberId(memberId)
                .orElseThrow(() -> new NoDataException("없는 지갑 정보입니다."));

        // 계좌 정보 만들기
        AccountRequest accountRequest = new AccountRequest(
                request.getBank(),
                request.getAccountNumber(),
                request.getFirstName(),
                request.getLastName()
        );

        Accounts accounts = accountService.createAccount(accountRequest);

        ChargeRefund chargeRefund = ChargeRefund.builder()
                .senderWalletId(wallet.getWalletId())
                .accountId(accounts.getAccountId())
                .status("B")
                .createdId(memberId)
                .modifiedId(memberId)
                .build();

        // 추후 환율 변동기 가져오면 적용
        BigDecimal price = BigDecimal.valueOf(request.getAmount());

        setPointByType(chargeRefund, request.getPointType(), price);

        chargeRefundRepository.save(chargeRefund);

        return new ResponseBody("성공했습니다.");
    }
}
