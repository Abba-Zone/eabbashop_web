package com.zon.abba.member.controller;

import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.member.request.EmailRequest;
import com.zon.abba.member.request.ListRecommendRequest;
import com.zon.abba.member.service.RecommendService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member/recommend")
public class RecommendController {

    private final RecommendService recommendService;

    @PostMapping("/auth")
    @Operation(summary = "추천인 인증", description = "실제 존재하는 유저인지 판별")
    public ResponseEntity<Object> authRecommend(@RequestBody EmailRequest emailRequest){

        return ResponseEntity.status(HttpStatus.OK).body(recommendService.checkMember(emailRequest));
    }

    @PostMapping("/request")
    @Operation(summary = "추천인 변경 요청", description = "내 상위 추천인을 변경하고 싶을 때")
    public ResponseEntity<Object> requestRecommend(@RequestBody EmailRequest emailRequest){


        return ResponseEntity.status(HttpStatus.OK).body(new ResponseBody("성공했습니다."));
    }

    @PostMapping("/update")
    @Operation(summary = "추천인 변경 승인/거절", description = "추천인 변경 요청 처리 필요")
    public ResponseEntity<Object> updateRecommend(@RequestBody EmailRequest emailRequest){


        return ResponseEntity.status(HttpStatus.OK).body(new ResponseBody("성공했습니다."));
    }

    @GetMapping("/list")
    @Operation(summary = "추천인 변경 요청 리스트", description = "추천인 변경 요청 리스트 출력")
    public ResponseEntity<Object> listRecommend(ListRecommendRequest listRecommendRequest){

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseBody("성공했습니다."));
    }
}
