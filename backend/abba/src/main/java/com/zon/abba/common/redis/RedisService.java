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


    public void save(String token, Object memberId) {
        ValueOperations<String, Object> values = redisTemplate.opsForValue();
        values.set(token, memberId, Duration.ofMillis(JWT_REFRESH_EXPIRATION));  // 1시간 뒤 메모리에서 삭제된다.
    }

    public void saveCode(String code, Object email) {
        ValueOperations<String, Object> values = redisTemplate.opsForValue();
        values.set(code, email, Duration.ofMillis(300_000));  // 5분 뒤 삭제
    }

    public void saveExchange(String code, Object rate) {
        ValueOperations<String, Object> values = redisTemplate.opsForValue();
        values.set(code, rate);
    }

    public void setLogoutValues(String token, Long validExpiration){
        ValueOperations<String, Object> values = redisTemplate.opsForValue();
        values.set(token, "logout", Duration.ofMillis(validExpiration));
    }

    public Object get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public Object hashGet(String key, String code) {
        return redisTemplate.opsForHash().get(key, code);
    }

    public void delete(String key) {
        redisTemplate.delete(key);
    }
}
