package com.zon.abba.point.controller;

import com.zon.abba.point.request.ChargeRequest;
import com.zon.abba.point.request.RefundRequest;
import com.zon.abba.point.service.ChargeRefundService;
import com.zon.abba.point.service.PointService;
import com.zon.abba.common.response.ResponseBody;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/point")
public class PointController {
    private static final Logger logger = LoggerFactory.getLogger(PointController.class);
    private final PointService pointService;
    private final ChargeRefundService chargeRefundService;

    @PostMapping("/charge")
    @Operation(summary = "포인트 충전 신청", description = "포인트 충전 신청을 할 수 있다.")
    public ResponseEntity<Object> chargePoint(@RequestBody ChargeRequest request){

        ResponseBody response = chargeRefundService.chargePoint(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/refund")
    @Operation(summary = "포인트 환급 신청", description = "포인트 환급 신청을 할 수 있다.")
    public ResponseEntity<Object> refundPoint(@RequestBody RefundRequest request){
        ResponseBody response = chargeRefundService.refundPoint(request);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}
