package com.zon.abba.member.service;

import com.zon.abba.common.redis.RedisService;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.member.dto.TokenDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReissueService {

    private final JwtTokenProvider tokenProvider;
    private final RedisService redisService;

    // access token이 만료됐지만 refresh token은 살아 있어서 둘다 재발급할 때
    @Transactional
    public TokenDto reissue(String refreshToken) {
        TokenDto token = new TokenDto();

        String refresh =  tokenProvider.checkRefreshToken(refreshToken);

        Authentication authentication = tokenProvider.getAuthentication(refresh, 1);
        redisService.delete(refresh);

        String accessToken = tokenProvider.createAccessToken(authentication);
        String newRefreshToken = tokenProvider.createRefreshToken(authentication);

        String memberId = tokenProvider.getCurrentMemberId().orElseThrow();

        redisService.save(newRefreshToken, memberId);

        // 새로운 토큰 정보 저장
        token.setAccessToken(accessToken);
        token.setRefreshToken(newRefreshToken);

        return token;
    }
}
