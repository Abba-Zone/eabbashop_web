package com.zon.abba.members.controller;

import com.zon.abba.common.code.StatusCode;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.members.request.LoginRequest;
import com.zon.abba.members.response.LoginResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;


    @PostMapping("/login")
    public ResponseEntity<Object> memberLogin(@RequestBody LoginRequest loginRequest){

        // 사용자 인증
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        // 인증 정보 설정
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // JWT 토큰 생성
        String jwt = tokenProvider.createAccessToken(authentication);

        // 응답으로 토큰 반환
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseBody(
                StatusCode.SUCCESS,
                new LoginResponse(jwt)

        ));
    }

    @GetMapping("/test")
    public ResponseEntity<Object> test(HttpServletRequest request){
        String accessToken = request.getHeader("Authorization");
        logger.info(accessToken);
        String email = tokenProvider.getEmailFromToken(accessToken.substring(7));
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseBody(
                StatusCode.SUCCESS,
                new LoginResponse(email)
        ));
    }
}
