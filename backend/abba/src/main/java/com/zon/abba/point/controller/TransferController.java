package com.zon.abba.point.controller;

import com.zon.abba.common.request.RequestList;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.point.request.TransferIdRequest;
import com.zon.abba.point.request.TransferRequest;
import com.zon.abba.point.service.TransferService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/request")
    @Operation(summary = "포인트 이체 취소 요청", description = "유저간 포인트 이체 취소를 신청할 수 있다.")
    public ResponseEntity<Object> requestCancelTransfer(@RequestBody TransferIdRequest request){

        ResponseBody response = transferService.requestCancelTransfer(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/request/list")
    @Operation(summary = "포인트 이체 취소 요청 리스트", description = "포인트 이체 취소 신청 목록을 확인할 수 있다.")
    public ResponseEntity<Object> requestCancelTransfer(RequestList request){

        ResponseListBody response = transferService.cancelTransferList(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
