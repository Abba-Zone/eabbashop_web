package com.zon.abba.members.service;

import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.members.dto.RecommendDto;
import com.zon.abba.members.entity.Member;
import com.zon.abba.members.entity.RecommendedMembers;
import com.zon.abba.members.repository.MemberRepository;
import com.zon.abba.members.repository.RecommendedMembersRepository;
import com.zon.abba.members.request.EmailRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecommendService {

    private static final Logger logger = LoggerFactory.getLogger(RecommendService.class);
    private MemberRepository memberRepository;
    private RecommendedMembersRepository recommendedMembersRepository;
    private JwtTokenProvider jwtTokenProvider;


    @Transactional
    public boolean checkMember(EmailRequest emailRequest){
        // 유저 이메일을 바탕으로 member 체크
        Optional<Member> memberOptional = memberRepository.findByEmail(emailRequest.getEmail());
        return memberOptional.isPresent();
    }


    @Transactional
    public void registRecommend(RecommendDto recommendDto){
        logger.info("추천인 등록을 시작합니다.");
        // 추천인 등록
        RecommendedMembers recommendedMembers = RecommendedMembers.builder()
                .referredId(recommendDto.getReferredId())
                .referId(recommendDto.getReferId())
                .build();

        recommendedMembersRepository.save(recommendedMembers);
        logger.info("추천인 등록을 완료합니다.");
    }


    public ResponseBody requestAlterRecommend(EmailRequest emailRequest){
        return null;
    }
}
