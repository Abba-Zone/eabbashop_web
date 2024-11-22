package com.zon.abba.common.security;

import com.zon.abba.members.service.CustomUserDetailsService;
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

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Component
public class JwtTokenProvider {
    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

//    private final String JWT_ACCESS_SECRET;
//    private final String JWT_REFRESH_SECRET;

    private final Long JWT_ACCESS_EXPIRATION;
    private final Long JWT_REFRESH_EXPIRATION;

    private final SecretKey accessKey;
    private final SecretKey refreshKey;
    private final CustomUserDetailsService userDetailsService;

    public JwtTokenProvider(
            @Value("${spring.jwt.access-secret}") String JWT_ACCESS_SECRET,
            @Value("${spring.jwt.refresh-secret}") String JWT_REFRESH_SECRET,
            @Value("${spring.jwt.access-expiration}") Long JWT_ACCESS_EXPIRATION,
            @Value("${spring.jwt.refresh-expiration}") Long JWT_REFRESH_EXPIRATION,
            CustomUserDetailsService userDetailsService
    ) {
//        this.JWT_ACCESS_SECRET = JWT_ACCESS_SECRET;
//        this.JWT_REFRESH_SECRET = JWT_REFRESH_SECRET;
        this.JWT_ACCESS_EXPIRATION = JWT_ACCESS_EXPIRATION;
        this.JWT_REFRESH_EXPIRATION = JWT_REFRESH_EXPIRATION;
        this.accessKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(JWT_ACCESS_SECRET));
        this.refreshKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(JWT_REFRESH_SECRET));
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
        String email = getEmailFromToken(token);

        // 사용자 이름을 이용해 UserDetails 객체를 가져옴
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);

        // UserDetails 객체를 기반으로 Authentication 객체 생성
        return new UsernamePasswordAuthenticationToken(userDetails, token, userDetails.getAuthorities());
    }

    // JWT에서 사용자 정보 추출
    public String getEmailFromToken(String token) {

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(accessKey)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public static Optional<String> getCurrentEmail() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null) {
            logger.debug("Security Context에 인증 정보가 없습니다.");
            return Optional.empty();
        }

        String email = null;
        if (authentication.getPrincipal() instanceof UserDetails) {
            UserDetails springSecurityUser = (UserDetails) authentication.getPrincipal();
            email = springSecurityUser.getUsername();
        } else if (authentication.getPrincipal() instanceof String) {
            email = (String) authentication.getPrincipal();
        }

        return Optional.ofNullable(email);
    }

}
