package com.zon.abba.members.service;

import com.zon.abba.members.entity.Member;
import com.zon.abba.members.repository.MemberRepository;
import com.zon.abba.members.request.LoginRequest;
import com.zon.abba.members.request.SignupRequest;
import com.zon.abba.members.response.LoginResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SignupService {

    private static final Logger logger = LoggerFactory.getLogger(SignupService.class);
    private final MemberRepository memberRepository;
    private final LoginService loginService;

    @Transactional
    public LoginResponse signup(SignupRequest signupRequest){
        // 1. 받아온 유저 정보를 입력한다.
        Member member = Member.builder()
                .firstName(signupRequest.getFirstName())
                .lastName(signupRequest.getLastName())
                .email(signupRequest.getEmail())
                .provider(signupRequest.getProvider())
                .phone(signupRequest.getPhone())
                .password(signupRequest.getPassword())
                .country(signupRequest.getCountry())
                .build();

        member.perPersist();
        memberRepository.save(member);

        // 로그인 정보를 담아서 로그인 신호를 보낸다.
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail(signupRequest.getEmail());
        loginRequest.setPassword(signupRequest.getPassword());

        return loginService.login(loginRequest);
    }
}
