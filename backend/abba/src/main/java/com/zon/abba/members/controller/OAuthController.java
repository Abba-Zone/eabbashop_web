package com.zon.abba.members.controller;

import com.zon.abba.members.response.LoginResponse;
import com.zon.abba.members.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.LoginException;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member/oauth")
public class OAuthController {
    private static final Logger logger = LoggerFactory.getLogger(OAuthController.class);
    private final LoginService loginService;

    /**
     * 임시 구글 코드
     *
     * @param requestBody
     * @return
     * @throws LoginException
     */
    @PostMapping("/{provider}/code")
    public ResponseEntity<Object> handleOAuthCode(
            @PathVariable String provider,
            @RequestBody Map<String, String> requestBody) throws LoginException {
        String code = requestBody.get("code");

        if (code != null) {
            logger.info("Received {} OAuth code: {}", provider, code);
            LoginResponse loginResponse = null;
            if (provider.equals("google")) {
                loginResponse = loginService.googleLogin(code);
            } else if (provider.equals("kakao")) {
                loginResponse = loginService.kakaoLogin(code);
            }
            // 예시 응답으로 성공 메시지를 반환
            return ResponseEntity.status(HttpStatus.OK).body(loginResponse);
        } else {
            logger.warn("No google code found in the request");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("no code.");
        }
    }
}