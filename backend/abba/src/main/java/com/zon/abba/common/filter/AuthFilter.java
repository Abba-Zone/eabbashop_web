package com.zon.abba.common.filter;

import com.zon.abba.auth.repository.RoleDetailRepository;
import com.zon.abba.common.exception.CommonException;
import com.zon.abba.common.exception.ErrorCode;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.member.entity.Member;
import com.zon.abba.member.repository.MemberRepository;
import com.zon.abba.member.service.SellerService;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.transaction.annotation.Transactional;


public class AuthFilter implements Filter { // @Component 제거
    private static final Logger logger = LoggerFactory.getLogger(SellerService.class);

    private final RoleDetailRepository roleDetailRepository;

    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthFilter(RoleDetailRepository roleDetailRepository,MemberRepository memberRepository , JwtTokenProvider jwtTokenProvider) {
        this.roleDetailRepository = roleDetailRepository;
        this.memberRepository = memberRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        String requestUri = httpRequest.getRequestURI();

        // 예외처리
        if (requestUri.startsWith("/api/member/oauth") ||
                requestUri.startsWith("/api/member/login") ||
                requestUri.startsWith("/api/member/signup") ||
                requestUri.startsWith("/api/member/email") ||
                requestUri.startsWith("/api/member/find") ||
                requestUri.startsWith("/api/member/update/password") ||
                requestUri.startsWith("/api/swagger-ui") ||
                requestUri.startsWith("/api/product/list") ||
                requestUri.startsWith("/api/product/detail") ||
                requestUri.startsWith("/api/board/list") ||
                requestUri.startsWith("/api/board/detail") ||
                requestUri.startsWith("/api/v3") ) {
            chain.doFilter(request, response);
            return;
        }


        // 사용자 권한 아이디 가져오기

        logger.info("유저 정보를 가져옵니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("204","없는 회원입니다."));

        Member member = memberRepository.findByMemberId(memberId);

        String roleId = member.getRoleID(); // 사용자의 RoleID 가져오기

        // 🔥 트랜잭션을 유지하면서 RoleDetail 조회
        //List<String> allowedPaths = getAllowedPaths(roleId);
        List<String> allowedPaths = roleDetailRepository.findByRoleRoleIdWithAuth(roleId).stream()
                .map(roleDetail -> roleDetail.getAuth().getPath())
                .collect(Collectors.toList());


        if(requestUri.contains("/api"))
            requestUri = requestUri.split("/api")[1];


        // 요청한 API가 허용된 URL인지 확인
        if (!allowedPaths.contains(requestUri)) {
            //throw new CommonException(ErrorCode.NO_MENU_PERMISSION);
            sendErrorResponse(httpResponse, ErrorCode.NO_MENU_PERMISSION.getStatusCode(), ErrorCode.NO_MENU_PERMISSION.getMessage());
            //httpResponse.sendError(HttpServletResponse.SC_FORBIDDEN, "Access Denied");
            return;
        }

        chain.doFilter(request, response);
    }

    @Transactional(readOnly = true) // 🔥 세션을 유지하면서 데이터 조회
    public List<String> getAllowedPaths(String roleId) {
        return roleDetailRepository.findByRoleRoleId(roleId).stream()
                .map(roleDetail -> roleDetail.getAuth().getPath()) // 여기서 LazyInitializationException 발생했었음
                .collect(Collectors.toList());
    }


    /**
     * ✅ HTTP 응답을 JSON 형태로 반환하는 메서드
     */
    private void sendErrorResponse(HttpServletResponse response, int status, String message) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(status); // 🔥 475 같은 비표준 코드도 설정 가능

        String jsonResponse = String.format("{\"status\": %d, \"message\": \"%s\"}", status, message);
        response.getWriter().write(jsonResponse);
        response.getWriter().flush();
    }
}

