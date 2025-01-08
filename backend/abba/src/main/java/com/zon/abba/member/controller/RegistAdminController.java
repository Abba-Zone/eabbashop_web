package com.zon.abba.member.controller;

import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.member.request.email.CodeRequest;
import com.zon.abba.member.request.registeradmin.RegisterAdminResultRequest;
import com.zon.abba.member.service.EmailService;
import com.zon.abba.member.service.SellerService;
import com.zon.abba.product.request.ProductListRequest;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/registeradmin")
@RestController
@RequiredArgsConstructor
public class RegistAdminController {
    private static final Logger logger = LoggerFactory.getLogger(RegistAdminController.class);
    private final SellerService sellerService;


    @PostMapping("/request")
    @Operation(summary = "대리점 신청", description = "대리점 신청")
    public ResponseEntity<Object> registerAdminRequest(){
        ResponseBody response = sellerService.requestResultAdmin();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    @GetMapping("/request/list")
    @Operation(summary = "대리점 신청 리스트", description = "대리점 신청 리스트")
    public ResponseEntity<Object> registerAdminRequestList(){
        ResponseListBody response = sellerService.requestResultAdminList();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/result")
    @Operation(summary = "대리점 신청 결과 업데이트", description = "대리점 신청 결과 업데이트")
    public ResponseEntity<Object> registerAdminResult(@RequestBody RegisterAdminResultRequest resultRequest){
        ResponseBody response = sellerService.updateResultAdmin(resultRequest);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
