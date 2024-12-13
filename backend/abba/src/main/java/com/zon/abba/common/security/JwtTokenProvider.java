package com.zon.abba.common.security;

import com.zon.abba.common.exception.ExpiredTokenException;
import com.zon.abba.common.exception.LogoutException;
import com.zon.abba.common.redis.RedisService;
import com.zon.abba.member.service.CustomUserDetailsService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Optional;

@Component
public class JwtTokenProvider {
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

//    private final String JWT_ACCESS_SECRET;
//    private final String JWT_REFRESH_SECRET;

    private final Long JWT_ACCESS_EXPIRATION;
    private final Long JWT_REFRESH_EXPIRATION;

    private final SecretKey accessKey;
    private final SecretKey refreshKey;

    private final RedisService redisService;
    private final CustomUserDetailsService userDetailsService;

    public JwtTokenProvider(
            @Value("${spring.jwt.access-secret}") String JWT_ACCESS_SECRET,
            @Value("${spring.jwt.refresh-secret}") String JWT_REFRESH_SECRET,
            @Value("${spring.jwt.access-expiration}") Long JWT_ACCESS_EXPIRATION,
            @Value("${spring.jwt.refresh-expiration}") Long JWT_REFRESH_EXPIRATION,
            RedisService redisService,
            CustomUserDetailsService userDetailsService
    ) {
//        this.JWT_ACCESS_SECRET = JWT_ACCESS_SECRET;
//        this.JWT_REFRESH_SECRET = JWT_REFRESH_SECRET;
        this.JWT_ACCESS_EXPIRATION = JWT_ACCESS_EXPIRATION;
        this.JWT_REFRESH_EXPIRATION = JWT_REFRESH_EXPIRATION;
        this.accessKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(JWT_ACCESS_SECRET));
        this.refreshKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(JWT_REFRESH_SECRET));
        this.redisService = redisService;
        this.userDetailsService = userDetailsService;
    }

    public String createAccessToken(Authentication authentication){
        String memberId = authentication.getName();
        Date now = new Date();
        // 만료 기간
        Date expiryDate = new Date(now.getTime() + JWT_ACCESS_EXPIRATION);

        return Jwts.builder()
                .setSubject(memberId)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(accessKey)
                .compact();
    }

    public String createRefreshToken(Authentication authentication){
        String memberId = authentication.getName();
        Date now = new Date();
        // 만료 기간
        Date expiryDate = new Date(now.getTime() + JWT_REFRESH_EXPIRATION);

        return Jwts.builder()
                .setSubject(memberId)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(refreshKey)
                .compact();
    }

    // JWT 토큰의 유효성 검증
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(accessKey).build().parseClaimsJws(token);
            Optional<Object> isLogout = Optional.ofNullable(redisService.get(token));
            if(isLogout.toString().equals("logout")) throw new LogoutException("로그아웃된 토큰입니다.");
            return true; // 유효한 토큰일 경우 true 반환
        } catch (SignatureException ex) { // JWT 서명이 유효하지 않을 때 발생
            logger.error("Invalid JWT signature");
        } catch (MalformedJwtException ex) { // JWT 형식이 잘못되었을 때 발생
            logger.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) { // JWT 토큰의 유효 기간이 만료되었을 때 발생
            logger.error("Expired JWT token");
            throw new ExpiredTokenException("토큰 만료됨.");
        } catch (UnsupportedJwtException ex) { // JWT 토큰의 형식이나 알고리즘이 지원되지 않을 때 발생
            logger.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) { // JWT 토큰이 비어 있거나 잘못된 값으로 제공될 때 발생
            logger.error("JWT claims string is empty.");
        }
        return false; // 유효하지 않은 토큰일 경우 false 반환
    }

    // JWT에서 Authentication 객체 생성
    public Authentication getAuthentication(String token, Integer type) {
        // 토큰에서 사용자 이름 추출
        String email = getEmailFromToken(token, type);

        // 사용자 이름을 이용해 UserDetails 객체를 가져옴
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);

        // UserDetails 객체를 기반으로 Authentication 객체 생성
        return new UsernamePasswordAuthenticationToken(userDetails, token, userDetails.getAuthorities());
    }

    // JWT에서 사용자 정보 추출
    public String getEmailFromToken(String token, Integer type) {

        SecretKey key = null;
        if(type == 0){
            key = accessKey;
        }else{
            key = refreshKey;
        }
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    // refresh token 재발급 체크
    public String checkRefreshToken(String refreshToken) throws LogoutException {

        String token = resolveToken(refreshToken);

        Optional<Object> email = Optional.ofNullable(redisService.get(token));

        if(email.isEmpty()){
            logger.info("refreshToken이 존재하지 않습니다.");
            throw new LogoutException("리프레쉬 만료 다시 로그인 해주세요.");
        }

        try{
            Jwts.parserBuilder().setSigningKey(refreshKey).build().parseClaimsJws(token);
            logger.info("refreshToken이 만료되지 않았습니다.");
            return token;
        }catch (ExpiredJwtException e) {
            logger.info("refreshToken이 만료되었습니다. 다시 로그인 해주세요.");
            throw new LogoutException("리프레쉬 만료 다시 로그인 해주세요.");
        }catch (Exception e){
            logger.error("refreshToken 재발급중 에러가 발생했습니다.: {}", e.getMessage());
            throw new LogoutException("리프레쉬 재발급중 에러가 발생했습니다.");
        }
    }

    // 토큰 정보 추출
    public String resolveToken(String bearerToken){

//        String bearerToken = request.getHeader("Authorization");
        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")){
            return bearerToken.substring(7);
        }
        return null;
    }

    public Long getExpiration(String accessToken){
        Date expiration = Jwts.parserBuilder().setSigningKey(accessKey).build().parseClaimsJws(accessToken).getBody().getExpiration();
        Long now = new Date().getTime();
        return (expiration.getTime() - now);
    }

    public Optional<String> getCurrentEmail() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null) {
            logger.debug("Security Context에 인증 정보가 없습니다.");
            return Optional.empty();
        }

        String email = null;
        if (authentication.getPrincipal() instanceof UserDetails springSecurityUser) {
            email = springSecurityUser.getUsername();
        } else if (authentication.getPrincipal() instanceof String) {
            email = (String) authentication.getPrincipal();
        }

        return Optional.ofNullable(email);
    }

}
