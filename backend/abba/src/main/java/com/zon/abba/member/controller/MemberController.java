package com.zon.abba.member.controller;

import com.zon.abba.common.redis.RedisService;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.member.dto.TokenDto;
import com.zon.abba.member.request.*;
import com.zon.abba.member.response.LoginResponse;
import com.zon.abba.member.response.MemberDetailResponse;
import com.zon.abba.member.service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Tag(name = "member API", description = "member management APIs")
@RequestMapping("/member")
public class MemberController {
    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);

    private final LoginService loginService;
    private final SignupService signupService;
    private final ReissueService reissueService;
    private final LogoutService logoutService;
    private final MemberService memberService;
    private final RedisService redisService;

    @Value("${spring.jwt.access-token}")
    private String ACCESSTOKEN;
    @Value("${spring.jwt.refresh-token}")
    private String REFRESHTOKEN;


    @PostMapping("/login")
    @Operation(summary = "login", description = "local member login")
    public ResponseEntity<Object> memberLogin(@RequestBody LoginRequest loginRequest){

        logger.info("email : {}",loginRequest.getEmail());
        LoginResponse loginResponse = loginService.login(loginRequest);
        logger.info("access token : {}",loginResponse.getAccessToken());
        // 응답으로 토큰 반환
        return ResponseEntity.status(HttpStatus.OK).body(loginResponse);
    }

    @PostMapping("/signup")
    @Operation(summary = "signup", description = "member signup")
    public ResponseEntity<Object> memberSignup(@RequestBody SignupRequest signupRequest){
        logger.info("{} {} 님의 회원가입 요청입니다.", signupRequest.getLastName(), signupRequest.getFirstName());
        LoginResponse loginResponse = signupService.signup(signupRequest);
        logger.info("회원가입 완료!");
        // 응답으로 토큰 반환
        return ResponseEntity.status(HttpStatus.OK).body(loginResponse);
    }

    @GetMapping("/reissue")
    @Operation(summary = "reissue", description = "재발급")
    public ResponseEntity<Object> tokenReissue(HttpServletRequest request){
        String refreshToken = request.getHeader(REFRESHTOKEN);
        logger.info("refreshToken : {}", refreshToken);
        TokenDto tokenDto = reissueService.reissue(refreshToken);
//        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.add(ACCESSTOKEN, tokenDto.getAccessToken());
//        httpHeaders.add(REFRESHTOKEN, tokenDto.getRefreshToken());
        return ResponseEntity.status(HttpStatus.OK).body(tokenDto);
    }

    @GetMapping("/logout")
    public ResponseEntity<ResponseBody> logout(HttpServletRequest request) throws Exception{
        String accessToken = request.getHeader(ACCESSTOKEN);
        String refreshToken = request.getHeader(REFRESHTOKEN);
        TokenDto tokenDto = new TokenDto(accessToken, refreshToken);

        ResponseBody response = logoutService.logout(tokenDto);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/update")
    @Operation(summary = "회원 정보 수정", description = "이름, 전화번호, 비밀번호 수정 가능")
    public ResponseEntity<Object> updateMemberInfo(@Valid @RequestBody MemberInfoRequest memberInfoRequest){

        ResponseBody response = memberService.updateMemberInfo(memberInfoRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/update/role")
    @Operation(summary = "회원 역할 수정", description = "역할 수정 가능")
    public ResponseEntity<Object> updateMemberRole(@RequestBody MemberRoleRequest memberRoleRequest){
        ResponseBody response = memberService.updateMemberRole(memberRoleRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/update/grade")
    @Operation(summary = "회원 등급 수정", description = "등급 수정 가능")
    public ResponseEntity<Object> updateMemberGrade(@RequestBody MemberGradeRequest memberGradeRequest){

        ResponseBody response = memberService.updateMemberGrade(memberGradeRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/detail")
    @Operation(summary = "회원 정보 조회", description = "회원 정보 상세 조회가 가능")
    public ResponseEntity<Object> detailMember(@PathVariable String memberID){

        MemberDetailResponse memberDetailResponse = memberService.detailMember(memberID);
        return ResponseEntity.status(HttpStatus.OK).body(memberDetailResponse);
    }

    @GetMapping("/list")
    @Operation(summary = "회원 리스트 조회", description = "회원 정보를 리스트로 가능")
    public ResponseEntity<Object> detailMember(MemberListRequest memberListRequest){

        ResponseListBody responseListBody = memberService.memberList(memberListRequest);
        return ResponseEntity.status(HttpStatus.OK).body(responseListBody);
    }

}
