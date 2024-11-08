package com.zon.abba.members.controller;

import com.zon.abba.members.service.OAuthService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.security.auth.login.LoginException;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class OAuthController {
    private static final Logger logger = LoggerFactory.getLogger(OAuthController.class);
    private final OAuthService oAuthService;

    @PostMapping("/oauth/google/code")
    public Map<String, String> handleGoogleOAuthCode(@RequestBody Map<String, String> requestBody) throws LoginException {
        String code = requestBody.get("code");

        if (code != null) {
            logger.info("Received Google OAuth code: {}", code);
            oAuthService.getGoogleUserInfo(oAuthService.googleLogin(code));
        } else {
            logger.warn("No code found in the request");
            return Map.of("error", "No code provided");
        }

        // 예시 응답으로 성공 메시지를 반환
        return Map.of("message", "Code received successfully", "code", code);
    }
}
