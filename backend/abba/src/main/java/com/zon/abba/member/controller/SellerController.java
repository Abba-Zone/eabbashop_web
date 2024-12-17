package com.zon.abba.member.controller;

import com.zon.abba.member.request.seller.SellerListRequest;
import com.zon.abba.member.service.SellerService;
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
    public ResponseEntity<Object> sellerList(SellerListRequest sellerListRequest){


        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}
