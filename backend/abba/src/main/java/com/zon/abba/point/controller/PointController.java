package com.zon.abba.point.controller;

import com.zon.abba.common.request.RequestList;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.point.request.ChargeRefundIdRequest;
import com.zon.abba.point.request.ChargeRequest;
import com.zon.abba.point.request.RefundRequest;
import com.zon.abba.point.response.DetailChargeRefundResponse;
import com.zon.abba.point.service.ChargeRefundService;
import com.zon.abba.point.service.PointService;
import com.zon.abba.common.response.ResponseBody;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/point")
public class PointController {
    private static final Logger logger = LoggerFactory.getLogger(PointController.class);
    private final PointService pointService;
    private final ChargeRefundService chargeRefundService;

    @PostMapping("/charge")
    @Operation(summary = "포인트 충전/환급 신청", description = "포인트 충전 신청을 할 수 있다.")
    public ResponseEntity<Object> chargePoint(@RequestBody ChargeRequest request){

        ResponseBody response = chargeRefundService.chargePoint(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/refund")
    @Operation(summary = "포인트 환급 신청", description = "포인트 환급 신청을 할 수 있다.")
    public ResponseEntity<Object> refundPoint(@RequestBody RefundRequest request){

        ResponseBody response = chargeRefundService.refundPoint(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/list/request")
    @Operation(summary = "내 포인트 신청 내역 조회", description = "내가 신청한 내역들을 볼 수 있다.")
    public ResponseEntity<Object> requestedChargeList(RequestList request){

        ResponseListBody response = chargeRefundService.chargeRefundList(request, false);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/list/response")
    @Operation(summary = "포인트 신청 내역 조회", description = "내가 신청받은 내역들을 볼 수 있다.")
    public ResponseEntity<Object> respondedChargeList(RequestList request){

        ResponseListBody response = chargeRefundService.chargeRefundList(request, true);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/cancel")
    @Operation(summary = "포인트 신청 취소", description = "포인트 신청을 취소할 수 있다.")
    public ResponseEntity<Object> cancelCharge(@RequestBody ChargeRefundIdRequest request){

        ResponseBody response = chargeRefundService.cancelChargeRefund(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/detail/response")
    @Operation(summary = "요청 받은 포인트 신청 상세", description = "내가 신청받은 요청의 상세 정보를 볼 수 있다.")
    public ResponseEntity<Object> detailRespondedChargeRefund(ChargeRefundIdRequest request){

        DetailChargeRefundResponse response = chargeRefundService.detailChargeRefund(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
