package com.zon.abba.members.controller;

import com.zon.abba.members.request.EmailRequest;
import com.zon.abba.members.response.EmailResponse;
import com.zon.abba.members.service.EmailService;
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
}
