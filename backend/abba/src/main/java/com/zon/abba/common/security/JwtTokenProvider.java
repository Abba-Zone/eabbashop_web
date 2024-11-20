package com.zon.abba.common.security;

import com.zon.abba.members.controller.MemberController;
import com.zon.abba.members.service.CustomUserDetailsService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtTokenProvider {
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    private final String JWT_SECRET;
    private final Long JWT_ACCESS_EXPIRATION;
    private final Long JWT_REFRESH_EXPIRATION;

    private final SecretKey key;
    private final CustomUserDetailsService userDetailsService;

    public JwtTokenProvider(
            @Value("${spring.jwt.secret}") String JWT_SECRET,
            @Value("${spring.jwt.access_expiration}") Long JWT_ACCESS_EXPIRATION,
            @Value("${spring.jwt.refresh_expiration}") Long JWT_REFRESH_EXPIRATION,
            CustomUserDetailsService userDetailsService
    ) {
        this.JWT_SECRET = JWT_SECRET;
        this.JWT_ACCESS_EXPIRATION = JWT_ACCESS_EXPIRATION;
        this.JWT_REFRESH_EXPIRATION = JWT_REFRESH_EXPIRATION;
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(JWT_SECRET));
        this.userDetailsService = userDetailsService;
    }

    public String createAccessToken(Authentication authentication){
        String email = authentication.getName();
        Date now = new Date();
        // 만료 기간
        Date expiryDate = new Date(now.getTime() + JWT_ACCESS_EXPIRATION);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key)
                .compact();
    }

    public String createRefreshToken(Authentication authentication){
        String email = authentication.getName();
        Date now = new Date();
        // 만료 기간
        Date expiryDate = new Date(now.getTime() + JWT_REFRESH_EXPIRATION);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key)
                .compact();
    }

    // JWT 토큰의 유효성 검증
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true; // 유효한 토큰일 경우 true 반환
        } catch (SignatureException ex) { // JWT 서명이 유효하지 않을 때 발생
            logger.error("Invalid JWT signature");
        } catch (MalformedJwtException ex) { // JWT 형식이 잘못되었을 때 발생
            logger.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) { // JWT 토큰의 유효 기간이 만료되었을 때 발생
            logger.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) { // JWT 토큰의 형식이나 알고리즘이 지원되지 않을 때 발생
            logger.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) { // JWT 토큰이 비어 있거나 잘못된 값으로 제공될 때 발생
            logger.error("JWT claims string is empty.");
        }
        return false; // 유효하지 않은 토큰일 경우 false 반환
    }

    // JWT에서 Authentication 객체 생성
    public Authentication getAuthentication(String token) {
        // 토큰에서 사용자 이름 추출
        String username = getEmailFromToken(token);

        // 사용자 이름을 이용해 UserDetails 객체를 가져옴
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);

        // UserDetails 객체를 기반으로 Authentication 객체 생성
        return new UsernamePasswordAuthenticationToken(userDetails, token, userDetails.getAuthorities());
    }

    // JWT에서 사용자 정보 추출
    public String getEmailFromToken(String token) {

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

}
