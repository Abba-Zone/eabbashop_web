package com.zon.abba.common.filter;

import com.zon.abba.auth.repository.RoleDetailRepository;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.member.repository.MemberRepository;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<AuthFilter> authFilter(RoleDetailRepository roleDetailRepository, MemberRepository memberRepository , JwtTokenProvider jwtTokenProvider) {
        FilterRegistrationBean<AuthFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new AuthFilter(roleDetailRepository, memberRepository, jwtTokenProvider));
        registrationBean.addUrlPatterns("/*"); // 모든 요청에 필터 적용
        registrationBean.setOrder(1); // 필터 우선순위 지정 (낮을수록 먼저 실행)
        return registrationBean;
    }
}
