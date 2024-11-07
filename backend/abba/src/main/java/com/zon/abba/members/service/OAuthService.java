package com.zon.abba.members.service;

import com.zon.abba.members.client.GoogleClient;
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


    @Transactional
    public void googleLogin(String code) throws LoginException {
        logger.info(googleClient.requestGoogleAccessToken(code));
    }

}