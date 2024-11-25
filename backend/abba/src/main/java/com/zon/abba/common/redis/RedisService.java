package com.zon.abba.common.redis;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class RedisService {
    private final RedisTemplate<String, Object> redisTemplate;

    @Value("${spring.jwt.refresh-expiration}")
    private Long JWT_REFRESH_EXPIRATION;


    public void save(String token, Object email) {
        ValueOperations<String, Object> values = redisTemplate.opsForValue();
        values.set(token, email, Duration.ofMillis(JWT_REFRESH_EXPIRATION));  // 1시간 뒤 메모리에서 삭제된다.
    }

    public void setLogoutValues(String token, Long validExpiration){
        ValueOperations<String, Object> values = redisTemplate.opsForValue();
        values.set(token, "logout", Duration.ofMillis(validExpiration));
    }

    public Object get(String token) {
        return redisTemplate.opsForValue().get(token);
    }

    public void delete(String token) {
        redisTemplate.delete(token);
    }
}
