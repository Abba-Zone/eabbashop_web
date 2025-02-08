package com.zon.abba.account.controller;

import com.zon.abba.account.request.AccountIdRequest;
import com.zon.abba.account.request.AccountRequest;
import com.zon.abba.account.request.UpdateAccountRequest;
import com.zon.abba.account.service.AccountService;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/list")
    @Operation(summary = "계좌 조회", description = "계좌 목록을 조회한다.")
    public ResponseEntity<Object> accountList(){

        ResponseListBody response = accountService.accountList();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/update")
    @Operation(summary = "계좌 수정", description = "계좌를 정보를 수정한다.")
    public ResponseEntity<Object> updateAccount(@RequestBody UpdateAccountRequest request){

        ResponseBody response = accountService.updateAccount(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/delete")
    @Operation(summary = "계좌 삭제", description = "계좌를 정보를 삭제한다.")
    public ResponseEntity<Object> deleteAccount(@RequestBody AccountIdRequest request){

        ResponseBody response = accountService.deleteAccount(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
