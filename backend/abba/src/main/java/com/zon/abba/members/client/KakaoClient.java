package com.zon.abba.members.client;

import com.zon.abba.members.request.KakaoAccessTokenRequest;
import com.zon.abba.members.response.KakaoAccessTokenResponse;
import com.zon.abba.members.response.KakaoMemberInfoResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import javax.security.auth.login.LoginException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class KakaoClient {
    private static final Logger logger = LoggerFactory.getLogger(KakaoClient.class);

    @Value("${spring.oauth.kakao.client-id}")
    private String clientId;
    @Value("${spring.oauth.kakao.client-secret}")
    private String clientSecret;
    @Value("${spring.oauth.kakao.redirect-uri}")
    private String redirectUri;
    @Value("${spring.oauth.kakao.grant-type}")
    private String grantType;
    @Value("${spring.oauth.kakao.access-token-url}")
    private String accessTokenUrl;
    @Value("${spring.oauth.kakao.user-info-url}")
    private String userInfoUrl;

    private final RestTemplate restTemplate;

    public String requestKakaoAccessToken(final String code) throws LoginException {
        final String decodedCode = URLDecoder.decode(code, StandardCharsets.UTF_8);
        final HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.add(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);

        // 요청 파라미터를 MultiValueMap으로 설정
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", grantType);
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", decodedCode);
        params.add("client_secret", clientSecret);

        final HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(params, headers);

        KakaoAccessTokenResponse response = restTemplate.exchange(
                accessTokenUrl, HttpMethod.POST, httpEntity, KakaoAccessTokenResponse.class
        ).getBody();

        return Optional.ofNullable(response)
                .orElseThrow(() -> new LoginException("NOT_FOUND_KAKAO_ACCESS_TOKEN_RESPONSE"))
                .getAccessToken();
    }


    public KakaoMemberInfoResponse requestKakaoUserInfo(String accessToken){
        final HttpHeaders headers = new HttpHeaders();
        headers.add("Accept-Charset", "UTF-8");
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        headers.add(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);
        final HttpEntity<KakaoAccessTokenRequest> httpEntity = new HttpEntity<>(headers);
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));

        return restTemplate.exchange(userInfoUrl, HttpMethod.GET, httpEntity, KakaoMemberInfoResponse.class)
                .getBody();
    }
}
