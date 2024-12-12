package com.zon.abba.members.service;

import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.members.dto.MemberDto;
import com.zon.abba.members.dto.RecommendDto;
import com.zon.abba.members.entity.Members;
import com.zon.abba.members.repository.MemberRepository;
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
    private final RecommendService recommendService;

    @Transactional
    public LoginResponse signup(SignupRequest signupRequest){

        // 1. 받아온 유저 정보를 입력한다.
        Members members = Members.builder()
                .firstName(signupRequest.getFirstName())
                .lastName(signupRequest.getLastName())
                .email(signupRequest.getEmail())
                .provider(signupRequest.getProvider())
                .phone(signupRequest.getPhone())
                .password(signupRequest.getPassword())
                .platform(signupRequest.getPlatform())
                .country(signupRequest.getCountry())
                .build();

//        member.perPersist();
        members = memberRepository.save(members);

        // 추천인 등록
        // 추천인 email에 맞는 refered를 찾는다.
        String referredId = memberRepository.findMemberIDByEmail(signupRequest.getRecommend())
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));
        // 현재 토큰에서 유저 정보를 가져온다.
        String referId = members.getMemberId();

        recommendService.registRecommend(new RecommendDto(referredId, referId));

        logger.info("회원 정보 저장 완료");
        // 로그인 정보를 담아서 로그인 신호를 보낸다.
        MemberDto memberDto = new MemberDto(members);
        return loginService.makeToken(memberDto);

    }
}
