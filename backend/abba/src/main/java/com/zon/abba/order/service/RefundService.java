package com.zon.abba.order.service;

import com.zon.abba.account.service.PointService;
import com.zon.abba.common.exception.CommonException;
import com.zon.abba.common.exception.NoDataException;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.request.RequestList;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.order.dto.RefundListDto;
import com.zon.abba.order.entity.OrderDetail;
import com.zon.abba.order.entity.Refund;
import com.zon.abba.order.mapping.RefundDetail;
import com.zon.abba.order.mapping.RefundOrder;
import com.zon.abba.order.repository.OrderDetailRepository;
import com.zon.abba.order.repository.RefundRepository;
import com.zon.abba.order.request.ApproveRefundRequest;
import com.zon.abba.order.request.RefundIdRequest;
import com.zon.abba.order.request.RegisterRefundRequest;
import com.zon.abba.order.response.DetailRefundResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RefundService {
    private static final Logger logger = LoggerFactory.getLogger(RefundService.class);
    private final JwtTokenProvider jwtTokenProvider;
    private final RefundRepository refundRepository;
    private final PointService pointService;
    private final OrderDetailRepository orderDetailRepository;

    @Transactional
    public ResponseBody requestRefund(RegisterRefundRequest request){

        logger.info("반품/환불 신청을 합니다.");

        logger.info("신청할 유저 정보를 가져옵니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        List<Refund> refunds = request.getOrderDetails().stream()
                .map(od -> {
                    String sellerId = orderDetailRepository.findSellerIdByOrderDetailId(od.getOrderDetailID());
                    OrderDetail orderDetail = orderDetailRepository.findById(od.getOrderDetailID())
                            .orElseThrow(() -> new NoDataException("없는 주문 데이터입니다."));

                    // 취소 처리
                    orderDetail.setStatus(400);
                    orderDetail.setModifiedId(memberId);

                    orderDetailRepository.save(orderDetail);

                    return Refund.builder()
                            .orderDetailId(od.getOrderDetailID())
                            .memberId(memberId)
                            .sellerId(sellerId)
                            .quantity(od.getQuantity())
                            .status(request.getStatus())
                            .message(request.getMessage())
                            .createdId(memberId)
                            .modifiedId(memberId)
                            .build();
                })
                .toList();

        refundRepository.saveAll(refunds);

        if(request.getStatus() == 100) logger.info("반품 신청을 완료했습니다.");
        else logger.info("환불 신청을 완료했습니다.");

        return new ResponseBody("성공했습니다.");

    }

    @Transactional
    public ResponseBody approveRefund(ApproveRefundRequest request){
        logger.info("반품/환불 신청을 승인/거절 합니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        logger.info("반품/환불 신청을 가져옵니다.");
        Refund refund = refundRepository.findById(request.getRefundID())
                .orElseThrow(() -> new NoDataException("없는 신청입니다."));

        if(request.getStatus() == 500){
            // 반품/환불 승인 상태 시 완료를 누를 경우
            if(refund.getStatus() == 300){
                // 포인트 환불처리
                logger.info("포인트 환불 과정을 진행합니다.");
                pointService.rollbackOrderPoint(refund.getOrderDetailId(), refund.getSellerId());
                pointService.rollbackOrderParentTree(refund.getOrderDetailId());
            }
        }
        refund.setStatus(request.getStatus());
        refund.setModifiedId(memberId);

        refundRepository.save(refund);

        if(request.getStatus() == 300) {
            logger.info("반품/환불 신청을 승인합니다.");

        }
        else {
            logger.info("반품/환불 신청을 거절합니다.");
            OrderDetail orderDetail = orderDetailRepository.findById(refund.getOrderDetailId())
                    .orElseThrow(() -> new NoDataException("없는 주문 데이터입니다."));

            // 환불 거절 처리
            orderDetail.setStatus(150);
            orderDetail.setModifiedId(memberId);

            orderDetailRepository.save(orderDetail);
        }

        return new ResponseBody("성공했습니다.");
    }

    @Transactional
    public ResponseListBody refundList(RequestList request){
        logger.info("반품/환불 신청 리스트를 반환합니다.");

        logger.info("접근자의 정보를 가져옵니다.");
        String sellerID = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        Pageable pageable = PageRequest.of(
                request.getPageNo(),
                request.getPageSize(),
                Sort.by(request.getSort().equals("ASC") ?
                                Sort.Direction.ASC : Sort.Direction.DESC,
                        request.getSortValue())
        );
        logger.info("반품/환불 신청 리스트를 가져옵니다.");
        Page<RefundOrder> pages = refundRepository.findRefundOrdersBySellerId(sellerID, request.getFilter(), request.getFilterValue(), pageable);

        List<RefundListDto> list = pages.stream()
                .map(RefundListDto::new)
                .toList();

        logger.info("리스트 반환을 완료했습니다.");
        return new ResponseListBody(pages.getTotalElements(), list);
    }

    @Transactional
    public DetailRefundResponse detailRefund(RefundIdRequest request){

        logger.info("반품 디테일을 반환합니다.");

        String sellerID = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        RefundDetail refundDetail = refundRepository.findRefundDetailById(request.getRefundID())
                .orElseThrow(() -> new NoDataException("없는 반품 데이터입니다."));

        if(!sellerID.equals(refundDetail.getSellerId())){
            throw new CommonException(666, "관리자 정보가 맞지 않습니다.");
        }

        return new DetailRefundResponse(refundDetail);
    }


}
