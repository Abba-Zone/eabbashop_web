package com.zon.abba.point.controller;

import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.point.request.TransferRequest;
import com.zon.abba.point.service.TransferService;
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
@RequestMapping("/point/transfer")
public class TransferController {
    private static final Logger logger = LoggerFactory.getLogger(TransferController.class);
    private final TransferService transferService;

    @PostMapping("")
    @Operation(summary = "포인트 이체", description = "유저간 포인트를 이체할 수 있다.")
    public ResponseEntity<Object> pointTransfer(@RequestBody TransferRequest request){

        ResponseBody response = transferService.pointTransfer(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
