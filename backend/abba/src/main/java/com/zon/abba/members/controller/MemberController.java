package com.zon.abba.members.controller;

import com.zon.abba.common.redis.RedisService;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.members.dto.TokenDto;
import com.zon.abba.members.request.LoginRequest;
import com.zon.abba.members.request.SignupRequest;
import com.zon.abba.members.response.LoginResponse;
import com.zon.abba.members.service.LoginService;
import com.zon.abba.members.service.LogoutService;
import com.zon.abba.members.service.ReissueService;
import com.zon.abba.members.service.SignupService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
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

    @GetMapping("/test")
    @Operation(summary = "test", description = "local member test")
    public ResponseEntity<Object> test(HttpServletRequest request){
//        redisService.save("123141515", "rudgns9334@gmail.com");
//        logger.info(redisService.get("123141515").toString());
//        redisService.delete("123141515");
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseBody("good"));
    }
}
