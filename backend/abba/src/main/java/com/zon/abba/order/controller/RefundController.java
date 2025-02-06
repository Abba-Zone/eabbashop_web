package com.zon.abba.order.controller;

import com.zon.abba.common.request.RequestList;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.order.request.ApproveRefundRequest;
import com.zon.abba.order.request.RegisterRefundRequest;
import com.zon.abba.order.service.RefundService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/order/refund")
public class RefundController {
    private static final Logger logger = LoggerFactory.getLogger(RefundController.class);

    private final RefundService refundService;

    @PostMapping()
    @Operation(summary = "반품 / 교환 요청", description = "구매한 상품을 반품, 교환 요청을 할 수 있다.")
    public ResponseEntity<Object> requestAfterService(@RequestBody RegisterRefundRequest request){

        ResponseBody response = refundService.requestRefund(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/approve")
    @Operation(summary = "반품 / 교환 승인", description = "반품, 교환 요청을 승인 또는 거절 할 수 있다.")
    public ResponseEntity<Object> approveAfterService(@RequestBody ApproveRefundRequest request){

        ResponseBody response = refundService.approveRefund(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/list")
    @Operation(summary = "반품 / 교환 리스트", description = "반품, 교환 요청 목록을 볼 수 있다.")
    public ResponseEntity<Object> afterServiceList(RequestList request){

        ResponseListBody response = refundService.refundList(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
