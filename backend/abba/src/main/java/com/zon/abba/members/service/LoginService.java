package com.zon.abba.members.service;

import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.members.client.GoogleClient;
import com.zon.abba.members.client.KakaoClient;
import com.zon.abba.members.request.LoginRequest;
import com.zon.abba.members.response.KakaoUserInfoResponse;
import com.zon.abba.members.response.GoogleUserInfoResponse;
import com.zon.abba.members.response.LoginResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.security.auth.login.LoginException;

@Service
@RequiredArgsConstructor
public class LoginService {
    private static final Logger logger = LoggerFactory.getLogger(LoginService.class);

    private final GoogleClient googleClient;
    private final KakaoClient kakaoClient;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;


    @Transactional
    public LoginResponse login(LoginRequest loginRequest){
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
        String accessToken = tokenProvider.createAccessToken(authentication);
        String refreshToken = tokenProvider


    }

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
        GoogleUserInfoResponse user = googleClient.requestGoogleUserInfo(accessToken);

        logger.info(user.toString());
    }

    @Transactional
    public void getKakaoUserInfo(String accessToken) {
        KakaoUserInfoResponse user = kakaoClient.requestKakaoUserInfo(accessToken);

        logger.info(user.getKakaoAccount().getEmail());
    }

}