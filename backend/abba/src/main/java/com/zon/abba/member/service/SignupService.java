package com.zon.abba.member.service;

import com.zon.abba.account.service.WalletService;
import com.zon.abba.common.exception.InvalidException;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.member.dto.MemberDto;
import com.zon.abba.member.dto.RecommendDto;
import com.zon.abba.member.entity.Member;
import com.zon.abba.member.repository.MemberRepository;
import com.zon.abba.member.request.member.SignupRequest;
import com.zon.abba.member.response.LoginResponse;
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
    private final WalletService walletService;
    private final LoginService loginService;
    private final RecommendService recommendService;

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
                .platform(signupRequest.getPlatform())
                .country(signupRequest.getCountry())
                .build();

//        member.perPersist();
        member = memberRepository.save(member);

        // 추천인 등록
        // 추천인 email에 맞는 refered를 찾는다.
        logger.info("추천인 ID를 가져옵니다.");
        String referredId = memberRepository.findMemberIDByEmail(signupRequest.getRecommend())
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        // 현재 토큰에서 유저 정보를 가져온다.
        String referId = member.getMemberId();

        recommendService.registRecommend(new RecommendDto(referredId, referId));

        // 지갑 생성
        if(!walletService.registerWallet(member.getMemberId())){
            throw new InvalidException("지갑 생성 중 에러가 발생했습니다.");
        }

        logger.info("회원 정보 저장 완료");
        // 로그인 정보를 담아서 로그인 신호를 보낸다.
        MemberDto memberDto = new MemberDto(member);
        return loginService.makeToken(memberDto);

    }
}
