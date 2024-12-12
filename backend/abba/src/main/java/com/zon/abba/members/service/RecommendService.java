package com.zon.abba.members.service;

import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.members.dto.RecommendDto;
import com.zon.abba.members.entity.Members;
import com.zon.abba.members.entity.RecommendedMembers;
import com.zon.abba.members.repository.MemberRepository;
import com.zon.abba.members.repository.RecommendedMembersRepository;
import com.zon.abba.members.request.AlterRecommendRequest;
import com.zon.abba.members.request.EmailRequest;
import com.zon.abba.members.request.ListRecommendRequest;
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
    private final MemberRepository memberRepository;
    private final RecommendedMembersRepository recommendedMembersRepository;


    @Transactional
    public ResponseBody checkMember(EmailRequest emailRequest){
        // 유저 이메일을 바탕으로 member 체크
        Optional<Members> memberOptional = memberRepository.findByEmail(emailRequest.getEmail());

        if(memberOptional.isEmpty()) throw new NoMemberException("없는 회원 정보입니다.");
        else return new ResponseBody("성공했습니다.");
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
        // 테이블 추가시 변경 예정

        return new ResponseBody("성공했습니다.");
    }

    public ResponseBody alterRecommend(AlterRecommendRequest alterRecommendRequest){
        // 테이블 추가시 작성 예정

        // 로그 추가 예정
        return new ResponseBody("성공했습니다.");
    }

    public ResponseListBody listRecommend(ListRecommendRequest listRecommendRequest){

        // 테이블 추가시 작성 예정
        return null;
    }
}
