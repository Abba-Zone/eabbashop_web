package com.zon.abba.order.service;

import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.order.entity.Refund;
import com.zon.abba.order.repository.RefundRepository;
import com.zon.abba.order.request.RegisterRefundRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RefundService {
    private static final Logger logger = LoggerFactory.getLogger(RefundService.class);
    private final JwtTokenProvider jwtTokenProvider;
    private final RefundRepository refundRepository;

    @Transactional
    public ResponseBody requestRefund(RegisterRefundRequest request){

        logger.info("반품/환불 신청을 합니다.");

        logger.info("신청할 유저 정보를 가져옵니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        List<Refund> refunds = request.getOrderDetails().stream()
                .map(od -> Refund.builder()
                        .orderDetailId(od.getOrderDetailID())
                        .memberId(memberId)
                        .quantity(od.getQuantity())
                        .status(request.getStatus())
                        .build())
                .toList();

        refundRepository.saveAll(refunds);

        logger.info("반품/환불 신청을 완료했습니다.");

        return new ResponseBody("성공했습니다.");

    }
}
