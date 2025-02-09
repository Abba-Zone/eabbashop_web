package com.zon.abba.point.service;

import com.zon.abba.account.entity.Accounts;
import com.zon.abba.common.exception.CommonException;
import com.zon.abba.common.exception.InvalidException;
import com.zon.abba.common.request.RequestList;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.point.dto.ChargeList;
import com.zon.abba.point.entity.ChargeRefund;
import com.zon.abba.account.entity.Wallet;
import com.zon.abba.point.repository.ChargeRefundRepository;
import com.zon.abba.account.repository.WalletRepository;
import com.zon.abba.account.request.AccountRequest;
import com.zon.abba.point.request.ChargeRefundIdRequest;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChargeRefundService {
    private static final Logger logger = LoggerFactory.getLogger(ChargeRefundService.class);

    private final ChargeRefundRepository chargeRefundRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final WalletRepository walletRepository;
    private final AccountService accountService;
    private final ExchangeRateService exchangeRateService;

    @Transactional
    public ResponseBody chargePoint(ChargeRequest request){
        logger.info("포인트 충전을 신청합니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        Wallet wallet = walletRepository.findOneByMemberId(memberId)
                .orElseThrow(() -> new NoDataException("없는 지갑 정보입니다."));

        // parent를 안보내주면 관리자 계정
        if(request.getParentID() == null || request.getParentID().isEmpty()){
            request.setParentID("883c259f-4084-440f-bc2d-cd226b3b8710");
        }

        Wallet parentWallet = walletRepository.findOneByMemberId(request.getParentID())
                .orElseThrow(() -> new NoDataException("없는 지갑 정보입니다."));

        // 추후 환율 변동기 가져오면 적용 - 완 -
        BigDecimal point = exchangeRateService.convertToUSD(BigDecimal.valueOf(request.getAmount()), "KRW");

        ChargeRefund chargeRefund = ChargeRefund.builder()
                .accountId(request.getAccountID())
                .amount(BigDecimal.valueOf(request.getAmount()))
                .point(point)
                .type(request.getPointType())
                .status(request.getStatus())
                .createdId(memberId)
                .modifiedId(memberId)
                .build();

        if(request.getStatus().equals("A")){
            chargeRefund.setReceiverWalletId(wallet.getWalletId());
            chargeRefund.setSenderWalletId(parentWallet.getWalletId());
        }else if(request.getStatus().equals("B")){
            chargeRefund.setSenderWalletId(wallet.getWalletId());
            chargeRefund.setReceiverWalletId(parentWallet.getWalletId());
        }

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

        // parent를 안보내주면 관리자 계정
        if(request.getParentID() == null || request.getParentID().isEmpty()){
            request.setParentID("883c259f-4084-440f-bc2d-cd226b3b8710");
        }

        Wallet parentWallet = walletRepository.findOneByMemberId(request.getParentID())
                .orElseThrow(() -> new NoDataException("없는 지갑 정보입니다."));

        // 계좌 정보 만들기
        AccountRequest accountRequest = new AccountRequest(
                request.getBank(),
                request.getAccountNumber(),
                request.getFirstName(),
                request.getLastName(),
                request.getIsMain()
        );

        Accounts accounts = accountService.createAccount(accountRequest);

        BigDecimal point = exchangeRateService.convertToUSD(BigDecimal.valueOf(request.getAmount()), "KRW");

        ChargeRefund chargeRefund = ChargeRefund.builder()
                .senderWalletId(wallet.getWalletId())
                .receiverWalletId(parentWallet.getWalletId())
                .accountId(accounts.getAccountId())
                .amount(BigDecimal.valueOf(request.getAmount()))
                .point(point)
                .status("B")
                .createdId(memberId)
                .modifiedId(memberId)
                .build();

        chargeRefundRepository.save(chargeRefund);

        return new ResponseBody("성공했습니다.");
    }

    @Transactional
    public ResponseListBody requestedChargeList(RequestList request){
        logger.info("포인트 충전 신청 내역을 조회합니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        Wallet wallet = walletRepository.findOneByMemberId(memberId)
                .orElseThrow(() -> new NoDataException("없는 지갑 정보입니다."));

        Pageable pageable = PageRequest.of(
                request.getPageNo(),
                request.getPageSize(),
                Sort.by(request.getSort().equals("ASC") ?
                                Sort.Direction.ASC : Sort.Direction.DESC,
                        request.getSortValue())
        );

        Page<ChargeRefund> pages = chargeRefundRepository.findByFilter(
                request.getFilter(),
                request.getFilterValue(),
                wallet.getWalletId(),
                pageable
        );

        List<ChargeList> list = pages.stream()
                .map(ChargeList::new)
                .toList();

        return new ResponseListBody(pages.getTotalElements(), list);

    }

    @Transactional
    public ResponseBody cancelChargeRefund(ChargeRefundIdRequest request){
        logger.info("포인트 충전/환급 신청을 취소합니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        ChargeRefund chargeRefund = chargeRefundRepository.findById(request.getChargeRefundID())
                .orElseThrow(() -> new NoDataException("없는 신청 정보입니다."));

        if(!(chargeRefund.getStatus().equals("A") || chargeRefund.getStatus().equals("B"))){
            throw new CommonException(229, "이미 처리된 정보입니다.");
        }

        chargeRefund.setStatus("C");
        chargeRefund.setModifiedId(memberId);

        return new ResponseBody("성공했습니다.");
    }
}
