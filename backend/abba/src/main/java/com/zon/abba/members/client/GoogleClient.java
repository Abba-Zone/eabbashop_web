package com.zon.abba.members.client;

import com.zon.abba.members.request.GoogleAccessTokenRequest;
import com.zon.abba.members.response.GoogleAccessTokenResponse;
import com.zon.abba.members.response.UserInfoResponse;
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
import org.springframework.web.client.RestTemplate;

import javax.security.auth.login.LoginException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GoogleClient {
    private static final Logger logger = LoggerFactory.getLogger(GoogleClient.class);

    @Value("${spring.oauth.google.client-id}")
    private String clientId;
    @Value("${spring.oauth.google.client-secret}")
    private String clientSecret;
    @Value("${spring.oauth.google.redirect-uri}")
    private String redirectUri;
    @Value("${spring.oauth.google.grant-type}")
    private String grantType;
    @Value("${spring.oauth.google.access-token-url}")
    private String accessTokenUrl;
    @Value("${spring.oauth.google.user-info-url}")
    private String userInfoUrl;

    private final RestTemplate restTemplate;

    public String requestGoogleAccessToken(final String code) throws LoginException {
        final String decodedCode = URLDecoder.decode(code, StandardCharsets.UTF_8);
        final HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);
        final HttpEntity<GoogleAccessTokenRequest> httpEntity = new HttpEntity<>(
                new GoogleAccessTokenRequest(decodedCode, clientId, clientSecret, redirectUri, grantType),
                headers
        );
        GoogleAccessTokenResponse response = restTemplate.exchange(
                accessTokenUrl, HttpMethod.POST, httpEntity, GoogleAccessTokenResponse.class
        ).getBody();

        return Optional.ofNullable(response)
                .orElseThrow(() -> new LoginException("NOT_FOUND_GOOGLE_ACCESS_TOKEN_RESPONSE"))
                .getAccessToken();
    }


    public UserInfoResponse requestGoogleUserInfo(String accessToken){
        final HttpHeaders headers = new HttpHeaders();
        headers.add("Accept-Charset", "UTF-8");
        headers.add("Content-Type", "application/json;charset=UTF-8");
        headers.add(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken);
        final HttpEntity<GoogleAccessTokenRequest> httpEntity = new HttpEntity<>(headers);
        restTemplate.getMessageConverters()
                .add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));

        return restTemplate.exchange(userInfoUrl, HttpMethod.GET, httpEntity, UserInfoResponse.class)
                .getBody();
    }
}
