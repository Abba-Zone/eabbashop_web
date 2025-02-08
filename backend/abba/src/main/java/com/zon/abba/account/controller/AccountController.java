package com.zon.abba.account.controller;

import com.zon.abba.account.request.AccountRequest;
import com.zon.abba.account.service.AccountService;
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
@RequestMapping("/account")
public class AccountController {
    private static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    private final AccountService accountService;

    @PostMapping("/register")
    @Operation(summary = "계좌 등록", description = "주로 사용하는 계좌를 등록한다.")
    public ResponseEntity<Object> registerAccount(@RequestBody AccountRequest request){

        ResponseBody response = accountService.registerAccount(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
