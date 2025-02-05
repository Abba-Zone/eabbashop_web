package com.zon.abba.point.controller;

import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.member.controller.RegistAdminController;
import com.zon.abba.point.entity.PointHolding;
import com.zon.abba.point.request.PointAccountRequest;
import com.zon.abba.point.request.PointHoldingRequest;
import com.zon.abba.point.service.PointService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/point")
@RestController
@RequiredArgsConstructor
public class PointController {
    private static final Logger logger = LoggerFactory.getLogger(RegistAdminController.class);

    private final PointService pointHoldingService;

    // 🔥 PointHolding 저장
    @PostMapping("/holding")
    public ResponseEntity<ResponseBody> savePoint(@RequestBody PointHoldingRequest pointHoldingReq) {
        ResponseBody response = pointHoldingService.savePoint(pointHoldingReq);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    // 🔥 PointHolding 정산
    @PostMapping("/accounting")
    public ResponseEntity<ResponseBody> accountPoint(@RequestBody PointAccountRequest pointAccountRequest) {
        ResponseBody response = pointHoldingService.accountPoint(pointAccountRequest);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
