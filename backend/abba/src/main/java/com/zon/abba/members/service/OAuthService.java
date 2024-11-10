package com.zon.abba.members.service;

import com.zon.abba.members.client.GoogleClient;
import com.zon.abba.members.client.KakaoClient;
import com.zon.abba.members.response.KakaoUserInfoResponse;
import com.zon.abba.members.response.UserInfoResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.security.auth.login.LoginException;

@Service
@RequiredArgsConstructor
public class OAuthService {
    private static final Logger logger = LoggerFactory.getLogger(OAuthService.class);

    private final GoogleClient googleClient;
    private final KakaoClient kakaoClient;


    @Transactional
    public String googleLogin(String code) throws LoginException {
        String accessToken = googleClient.requestGoogleAccessToken(code);
        logger.info(accessToken);
        return accessToken;
    }

    @Transactional
    public String kakaoLogin(String code) throws LoginException {
        String accessToken = kakaoClient.requestKakaoAccessToken(code);
        logger.info(accessToken);
        return accessToken;
    }

    @Transactional
    public void getGoogleUserInfo(String accessToken) {
        UserInfoResponse user = googleClient.requestGoogleUserInfo(accessToken);

        logger.info(user.toString());
    }

    @Transactional
    public void getKakaoUserInfo(String accessToken) {
        KakaoUserInfoResponse user = kakaoClient.requestKakaoUserInfo(accessToken);

        logger.info(user.toString());
    }

}