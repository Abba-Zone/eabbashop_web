package com.zon.abba.member.controller;

import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.member.request.EmailRequest;
import com.zon.abba.member.response.EmailResponse;
import com.zon.abba.member.service.EmailService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/member/email")
@RestController
@RequiredArgsConstructor
public class EmailController {

    private static final Logger logger = LoggerFactory.getLogger(EmailController.class);
    private final EmailService emailService;

    @PostMapping("/auth")
    @Operation(summary = "이메일 인증", description = "이메일 인증")
    public ResponseEntity<Object> authEmail(@RequestBody EmailRequest emailRequest){
        logger.info("email 인증을 시작합니다. {}", emailRequest.getEmail());
        EmailResponse emailResponse = emailService.sendMail(emailRequest);
        logger.info("email 인증 코드. {}", emailResponse.getCode());

        return ResponseEntity.status(HttpStatus.OK).body(emailResponse);
    }

    @GetMapping("/check")
    @Operation(summary = "이메일 유무 체크", description = "해당 이메일을 가진 유저가 존재하는지 체크")
    public ResponseEntity<Object> checkEmail(EmailRequest emailRequest){
        logger.info("유저 이메일을 체크합니다.");
        ResponseBody response = emailService.checkEmail(emailRequest);
        logger.info("이메일 체크 완료");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
