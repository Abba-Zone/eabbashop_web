package com.zon.abba.member.service;

import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.member.dto.ChangeRecommendedMembersListDto;
import com.zon.abba.member.dto.RecommendDto;
import com.zon.abba.member.entity.ChangeRecommendedMembers;
import com.zon.abba.member.entity.RecommendedMember;
import com.zon.abba.member.mapping.ChangeRecommendedMembersList;
import com.zon.abba.member.repository.ChangeRecommendedMembersRepository;
import com.zon.abba.member.repository.MemberRepository;
import com.zon.abba.member.repository.RecommendedMemberRepository;
import com.zon.abba.member.request.member.AlterRecommendRequest;
import com.zon.abba.member.request.email.EmailRequest;
import com.zon.abba.member.request.recommend.ListRecommendRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RecommendService {

    private static final Logger logger = LoggerFactory.getLogger(RecommendService.class);
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final RecommendedMemberRepository recommendedMemberRepository;
    private final ChangeRecommendedMembersRepository changeRecommendedMembersRepository;

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

        logger.info("테이블 변경 요청을 넣습니다.");
        // 테이블 추가시 변경 예정
        // 현재 유저 정보
        String referID = jwtTokenProvider.getCurrentEmail()
                .flatMap(memberRepository::findByEmail)
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."))
                .getMemberId();

        // 바뀔 추천인 정보
        String newReferedID = memberRepository.findByEmail(emailRequest.getEmail())
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."))
                .getMemberId();

        ChangeRecommendedMembers changeRecommendedMembers = ChangeRecommendedMembers.builder()
                .newReferredId(newReferedID)
                .referId(referID)
                .status("A")
                .build();

        changeRecommendedMembersRepository.save(changeRecommendedMembers);

        return new ResponseBody("성공했습니다.");
    }

    public ResponseBody alterRecommend(AlterRecommendRequest alterRecommendRequest){
        // 테이블 추가시 작성 예정

        // 로그 추가 예정
        return new ResponseBody("성공했습니다.");
    }

    public ResponseListBody listRecommend(ListRecommendRequest listRecommendRequest){

        logger.info("변경 요청 리스트 반환");

        // pageable 변수 생성
        Pageable pageable = PageRequest.of(
                listRecommendRequest.getPageNo(),
                listRecommendRequest.getPageSize()
        );

        // page 반환
        Page<ChangeRecommendedMembersList> page = changeRecommendedMembersRepository.findAllWithNames(pageable);

        // list 반환
        List<ChangeRecommendedMembersListDto> list = page.stream()
                .map(ChangeRecommendedMembersListDto::new)
                .toList();

        logger.info("변경 요청 리스트 반환 완료");

        return new ResponseListBody(page.getTotalElements(), list);
    }
}
