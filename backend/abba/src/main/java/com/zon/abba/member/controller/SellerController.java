package com.zon.abba.member.controller;

import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.member.request.seller.SellerDetailRequest;
import com.zon.abba.member.request.seller.SellerListRequest;
import com.zon.abba.member.response.SellerDetailResponse;
import com.zon.abba.member.service.SellerService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member/seller")
public class SellerController {
    private static final Logger logger = LoggerFactory.getLogger(SellerController.class);
    private final SellerService sellerService;

    @GetMapping("/list")
    @Operation(summary = "가게 리스트", description = "가게 리스트 확인")
    public ResponseEntity<Object> sellerList(SellerListRequest sellerListRequest){

        ResponseListBody response = sellerService.sellerList(sellerListRequest);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/detail")
    @Operation(summary = "가게 상세 정보 확인", description = "가게 정보 확인")
    public ResponseEntity<Object> sellerDetail(SellerDetailRequest sellerDetailRequest){
        SellerDetailResponse response = sellerService.sellerDetail(sellerDetailRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
