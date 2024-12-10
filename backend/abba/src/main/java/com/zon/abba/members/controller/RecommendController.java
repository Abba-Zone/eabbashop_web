package com.zon.abba.members.controller;

import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.members.request.EmailRequest;
import com.zon.abba.members.service.RecommendService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member/recommend")
public class RecommendController {

    private final RecommendService recommendService;

    @PostMapping("/auth")
    @Operation(summary = "추천인 인증", description = "실제 존재하는 유저인지 판별")
    public ResponseEntity<Object> recommendAuth(@RequestBody EmailRequest emailRequest){

        if(recommendService.checkMember(emailRequest)) return ResponseEntity.status(HttpStatus.OK).body(new ResponseBody("성공했습니다."));
        else throw new NoMemberException("없는 회원 정보입니다.");
    }
}
