package com.zon.abba.members.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class OAuthController {
    private static final Logger logger = LoggerFactory.getLogger(OAuthController.class);
    @PostMapping("/oauth/google/code")
    public Map<String, String> handleGoogleOAuthCode(@RequestBody Map<String, String> requestBody) {
        String code = requestBody.get("code");

        if (code != null) {
            logger.info("Received Google OAuth code: " + code);
            // 여기에 code를 처리하는 추가 로직을 작성할 수 있습니다.
        } else {
            logger.warn("No code found in the request");
            return Map.of("error", "No code provided");
        }

        // 예시 응답으로 성공 메시지를 반환
        return Map.of("message", "Code received successfully", "code", code);
    }
}
