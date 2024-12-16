package com.zon.abba.member.service;

import com.zon.abba.common.redis.RedisService;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.member.dto.TokenDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogoutService {

    private final JwtTokenProvider tokenProvider;
    private final RedisService redisService;

    @Transactional
    public ResponseBody logout(TokenDto tokenDto){
        ResponseBody responseBody = new ResponseBody();
        String accessToken = tokenProvider.resolveToken(tokenDto.getAccessToken());
        String refreshToken = tokenProvider.resolveToken(tokenDto.getRefreshToken());

        // 토큰 유효성 검사
        if(!tokenProvider.validateToken(accessToken)){
            responseBody.setMessage("FAIL");
        }else{
            // 토큰이 유효하다면 해당 토큰의 남은 기간과 함께 redis에 logout으로 저장
            long validExpiration = tokenProvider.getExpiration(accessToken);
            redisService.setLogoutValues(accessToken, validExpiration);

            // redis에 저장된 refresh 토큰 삭제
            if(redisService.get(refreshToken) != null){
                redisService.delete(refreshToken);
            }
            responseBody.setMessage("SUCCESS");

        }
        return responseBody;
    }
}
