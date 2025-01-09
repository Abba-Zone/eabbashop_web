package com.zon.abba.common.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Enumeration;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String requestURI = request.getRequestURI();

        logger.info("접근중인 url: " + requestURI);
        // 인증이 필요 없는 경로는 필터를 통과
        if (requestURI.startsWith("/api/member/oauth/") ||
                requestURI.startsWith("/api/member/login/") ||
                requestURI.startsWith("/api/member/signup/") ||
                requestURI.startsWith("/api/member/email/") ||
                requestURI.startsWith("/api/member/find/") ||
                requestURI.startsWith("/api/member/update/password/") ||
                requestURI.startsWith("/api/swagger-ui/") ||
                //requestURI.startsWith("/api/product/") ||
                requestURI.startsWith("/api/v3/") ) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = getJwtFromRequest(request);
        logger.info("jwt 토큰을 검사합니다. : " + jwt);

        if(jwt != null && tokenProvider.validateToken(jwt)){
            logger.info("인증 정보를 만듭니다.");
            Authentication authentication = tokenProvider.getAuthentication(jwt, 0);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);

    }

    private String getJwtFromRequest(HttpServletRequest request) {

        // 모든 헤더의 키를 로그로 출력
        Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            logger.info("Header Key: " + headerName + ", Value: " + request.getHeader(headerName));
        }
        String bearerToken = request.getHeader("Access-Token");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
