package com.zon.abba.point.service;

import com.zon.abba.common.exception.CommonException;
import com.zon.abba.common.exception.InvalidException;
import com.zon.abba.common.request.RequestList;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.point.dto.ChargeRefundListDto;
import com.zon.abba.point.entity.ChargeRefund;
import com.zon.abba.account.entity.Wallet;
import com.zon.abba.point.mapping.ChargeRefundInfo;
import com.zon.abba.point.mapping.ChargeRefundList;
import com.zon.abba.point.repository.ChargeRefundRepository;
import com.zon.abba.account.repository.WalletRepository;
import com.zon.abba.point.request.ChargeRefundIdRequest;
import com.zon.abba.point.request.ChargeRefundStatusRequest;
import com.zon.abba.point.request.ChargeRequest;
import com.zon.abba.point.request.RefundRequest;
import com.zon.abba.account.service.AccountService;
import com.zon.abba.common.exception.NoDataException;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.point.response.DetailChargeRefundResponse;
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
        BigDecimal point = exchangeRateService.convertToUSD(BigDecimal.valueOf(request.getAmount()), 0);

        ChargeRefund chargeRefund = ChargeRefund.builder()
                .receiverWalletId(wallet.getWalletId())
                .senderWalletId(parentWallet.getWalletId())
                .amount(BigDecimal.valueOf(request.getAmount()))
                .point(point)
                .type(request.getPointType())
                .status("A")
                .createdId(memberId)
                .modifiedId(memberId)
                .build();

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

        //환급은.. 나중에
//        BigDecimal amount = exchangeRateService.convertToKRW(BigDecimal.valueOf(request.getPoint()), 1);

        ChargeRefund chargeRefund = ChargeRefund.builder()
                .senderWalletId(wallet.getWalletId())
                .receiverWalletId(parentWallet.getWalletId())
                .accountId(request.getAccountID())
                .point(BigDecimal.valueOf(request.getPoint()))
                .type(request.getPointType())
                .status("B")
                .createdId(memberId)
                .modifiedId(memberId)
                .build();

        chargeRefundRepository.save(chargeRefund);

        return new ResponseBody("성공했습니다.");
    }

    @Transactional
    public ResponseListBody chargeRefundList(RequestList request, boolean isAdmin){
        logger.info("신청한 포인트 충전 신청 내역을 조회합니다.");
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

        Page<ChargeRefundList> pages = chargeRefundRepository.findByFilter(
                request.getFilter(),
                request.getFilterValue(),
                wallet.getWalletId(),
                pageable
        );

        List<ChargeRefundListDto> list = pages.stream()
                .map(cr -> new ChargeRefundListDto(cr, isAdmin))
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


        if(chargeRefund.getStatus().equals("A")) chargeRefund.setStatus("C");
        else if(chargeRefund.getStatus().equals("B")) chargeRefund.setStatus("D");
        else throw new CommonException(229, "이미 처리된 정보입니다.");

        chargeRefund.setModifiedId(memberId);

        return new ResponseBody("성공했습니다.");
    }

    @Transactional
    public ResponseBody confirmChargeRefund(ChargeRefundStatusRequest request){
        logger.info("포인트 충전/환급 신청을 완료 처리 하거나 거절합니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        ChargeRefund chargeRefund = chargeRefundRepository.findById(request.getChargeRefundID())
                .orElseThrow(() -> new NoDataException("없는 신청 정보입니다."));


        if(chargeRefund.getStatus().equals("A")) {
            if(!(request.getStatus().equals("E") || request.getStatus().equals("G"))){
                throw new InvalidException("옳지 않은 요청입니다.");
            }
        }
        else if(chargeRefund.getStatus().equals("B")) {
            if(!(request.getStatus().equals("F") || request.getStatus().equals("H"))){
                throw new InvalidException("옳지 않은 요청입니다.");
            }
        }
        else throw new CommonException(229, "이미 처리된 정보입니다.");

        chargeRefund.setStatus(request.getStatus());
        chargeRefund.setModifiedId(memberId);

        // 환급 처리가 된 경우 ak를 뿌려줘야 한다.
        if(request.getStatus().equals("F")){

        }


        return new ResponseBody("성공했습니다.");
    }

    @Transactional
    public DetailChargeRefundResponse detailChargeRefund(ChargeRefundIdRequest request){
        logger.info("포인트 충전/환급 신청 정보를 확인합니다.");

        ChargeRefundInfo chargeRefundInfo = chargeRefundRepository.findInfoByChargeRefundId(request.getChargeRefundID())
                .orElseThrow(() -> new NoDataException("없는 신청 정보입니다."));

        return new DetailChargeRefundResponse(chargeRefundInfo);
    }
}
