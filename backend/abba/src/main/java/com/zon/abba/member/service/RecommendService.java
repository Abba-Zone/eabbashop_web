package com.zon.abba.member.service;

import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.member.dto.RecommendDto;
import com.zon.abba.member.entity.RecommendedMember;
import com.zon.abba.member.repository.MemberRepository;
import com.zon.abba.member.repository.RecommendedMemberRepository;
import com.zon.abba.member.request.member.AlterRecommendRequest;
import com.zon.abba.member.request.email.EmailRequest;
import com.zon.abba.member.request.recommend.ListRecommendRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RecommendService {

    private static final Logger logger = LoggerFactory.getLogger(RecommendService.class);
    private final MemberRepository memberRepository;
    private final RecommendedMemberRepository recommendedMemberRepository;

    @Transactional
    public void registRecommend(RecommendDto recommendDto){
        logger.info("추천인 등록을 시작합니다.");
        // 추천인 등록
        RecommendedMember recommendedMember = RecommendedMember.builder()
                .referredId(recommendDto.getReferredId())
                .referId(recommendDto.getReferId())
                .build();

        recommendedMemberRepository.save(recommendedMember);
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
