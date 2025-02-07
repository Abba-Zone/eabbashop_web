package com.zon.abba.account.controller;

import com.zon.abba.account.dto.WalletDto;
import com.zon.abba.account.request.WalletListRequest;
import com.zon.abba.account.response.WalletResponse;
import com.zon.abba.account.service.WalletService;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.member.service.EmailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/wallet")
@RequiredArgsConstructor
public class WalletController {
    private static final Logger logger = LoggerFactory.getLogger(WalletController.class);
    private final WalletService walletService;

    @GetMapping()
    @Operation(summary = "지갑 조회", description = "자신의 지갑 내용을 볼 수 있다.")
    public ResponseEntity<Object> getWallet(){
        WalletResponse response = walletService.getMyWallet();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/list")
    @Operation(summary = "지갑 내역 조회", description = "자신의 지갑 사용 내역을 볼 수 있다.")
    public ResponseEntity<Object> getWalletHistory(@Parameter WalletListRequest req){
        ResponseListBody response = walletService.getWalletList("",req);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/list/admin")
    @Operation(summary = "지갑 내역 조회", description = "회원의 지갑 사용 내역을 볼 수 있다.")
    public ResponseEntity<Object> getWalletHistoryAdmin(@Parameter WalletListRequest req){
        ResponseListBody response = walletService.getWalletList("admin", req);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/detail")
    @Operation(summary = "지갑 내역 상세", description = "지갑 사용 내역 상세를 볼 수 있다.")
    public ResponseEntity<Object> getWalletHistoryDetail(){
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}
