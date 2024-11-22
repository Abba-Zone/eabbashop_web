package com.zon.abba.members.controller;

import com.zon.abba.common.code.StatusCode;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.members.request.LoginRequest;
import com.zon.abba.members.response.LoginResponse;
import com.zon.abba.members.service.LoginService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Tag(name = "member API", description = "member management APIs")
@RequestMapping("/member")
public class MemberController {
    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final LoginService loginService;


    @PostMapping("/login")
    @Operation(summary = "login", description = "local member login")
    public ResponseEntity<Object> memberLogin(@RequestBody LoginRequest loginRequest){

        logger.info("email : {}",loginRequest.getEmail());
        LoginResponse loginResponse = loginService.login(loginRequest);

        // 응답으로 토큰 반환
        return ResponseEntity.status(HttpStatus.OK).body(loginResponse);
    }

    @GetMapping("/test")
    @Operation(summary = "test", description = "local member login test")
    public ResponseEntity<Object> test(HttpServletRequest request){
        String accessToken = request.getHeader("Authorization");
        logger.info(accessToken);
        String email = tokenProvider.getEmailFromToken(accessToken.substring(7));
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseBody(
                StatusCode.SUCCESS,
                new LoginResponse()
        ));
    }
}
