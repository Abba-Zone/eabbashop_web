package com.zon.abba.common.security;

import com.zon.abba.members.service.CustomUserDetailsService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtTokenProvider tokenProvider;

    @Value("${spring.jwt.access-token}")
    private String ACCESSTOKEN;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String requestURI = request.getRequestURI();

        logger.info("접근중인 url: " + requestURI);
        // 인증이 필요 없는 경로는 필터를 통과
        if (requestURI.startsWith("/api/member/") ||
                requestURI.startsWith("/api/swagger-ui/") ||
                requestURI.startsWith("/api/v3/") ||
                requestURI.startsWith("/api/email/")) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = getJwtFromRequest(request);

        if(jwt != null && tokenProvider.validateToken(jwt)){
            Authentication authentication = tokenProvider.getAuthentication(jwt, 0);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);

    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader(ACCESSTOKEN);
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
