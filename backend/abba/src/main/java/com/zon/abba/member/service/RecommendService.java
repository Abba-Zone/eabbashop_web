package com.zon.abba.member.service;

import com.zon.abba.common.exception.NoDataException;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.request.RequestList;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.member.dto.ChangeRecommendedMembersListDto;
import com.zon.abba.member.dto.RecommendDto;
import com.zon.abba.member.entity.ChangeRecommendedMembers;
import com.zon.abba.member.entity.RecommendedMember;
import com.zon.abba.member.entity.RecommendedMembersAlterLog;
import com.zon.abba.member.mapping.ChangeRecommendedMembersList;
import com.zon.abba.member.repository.ChangeRecommendedMembersRepository;
import com.zon.abba.member.repository.MemberRepository;
import com.zon.abba.member.repository.RecommendedMemberRepository;
import com.zon.abba.member.repository.RecommendedMembersAlterLogRepository;
import com.zon.abba.member.request.recommend.AlterRecommendRequest;
import com.zon.abba.member.request.email.EmailRequest;
import com.zon.abba.member.request.recommend.ChangeRecommendRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    private final RecommendedMembersAlterLogRepository recommendedMembersAlterLogRepository;


    @Transactional
    public String getRecommend(String memberId){
        logger.info("member에 맞는 추천인을 찾습니다.");

        // memberId로 추천인 찾기
        return recommendedMemberRepository.findEmailByReferIdNative(memberId)
                .orElse(null);
    }

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


    @Transactional
    public ResponseBody requestAlterRecommend(EmailRequest emailRequest){

        logger.info("테이블 변경 요청을 넣습니다. 대상자 : {}", emailRequest.getEmail());
        // 테이블 추가시 변경 예정
        // 현재 유저 정보
        logger.info("referID를 가져옵니다.");
        String referID = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        // 바뀔 추천인 정보
        logger.info("새로운 referredID를 가져옵니다.");
        String newReferredID = memberRepository.findByEmail(emailRequest.getEmail())
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."))
                .getMemberId();

        logger.info("변경 요청을 신청합니다.");
        ChangeRecommendedMembers changeRecommendedMembers = ChangeRecommendedMembers.builder()
                .newReferredId(newReferredID)
                .referId(referID)
                .status("A")
                .build();

        changeRecommendedMembersRepository.save(changeRecommendedMembers);

        return new ResponseBody("성공했습니다.");
    }

    @Transactional
    public long requestAlterRecommendReturnID(EmailRequest emailRequest){

        logger.info("테이블 변경 요청을 넣습니다. 대상자 : {}", emailRequest.getEmail());
        // 테이블 추가시 변경 예정
        // 현재 유저 정보
        logger.info("referID를 가져옵니다.");
        String referID = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        // 바뀔 추천인 정보
        logger.info("새로운 referredID를 가져옵니다.");
        String newReferredID = memberRepository.findByEmail(emailRequest.getEmail())
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."))
                .getMemberId();

        logger.info("변경 요청을 신청합니다.");
        ChangeRecommendedMembers changeRecommendedMembers = ChangeRecommendedMembers.builder()
                .newReferredId(newReferredID)
                .referId(referID)
                .status("A")
                .build();

        changeRecommendedMembersRepository.save(changeRecommendedMembers);

        return changeRecommendedMembers.getChangeRecommendedMemberId();
    }

    @Transactional
    public ResponseBody deleteRecommend(){
        logger.info("상위 추천인을 삭제를 시작합니다.");

        logger.info("상위 추천인 정보를 가져옵니다.");
        RecommendedMember recommendedMember = jwtTokenProvider.getCurrentMemberId()
                .flatMap(recommendedMemberRepository::findByReferId)
                .orElseThrow(() -> new NoDataException("없는 데이터입니다."));

        logger.info("추천인 삭제 로그를 기록합니다.");
        // 로그는 기존의 내용을 그대로 넣고 변경 내용을 적용
        RecommendedMembersAlterLog recommendedMembersAlterLog = new RecommendedMembersAlterLog(recommendedMember, "D");
        recommendedMembersAlterLogRepository.save(recommendedMembersAlterLog);

        logger.info("삭제 처리를 합니다.");
        recommendedMember.setReferredId(null);
        recommendedMemberRepository.save(recommendedMember);

        return new ResponseBody("성공했습니다.");
    }

    @Transactional
    public ResponseBody alterRecommend(AlterRecommendRequest alterRecommendRequest){

        logger.info("변경 정보를 업데이트합니다.");
        // 1. 변경 정보 가져오기
        ChangeRecommendedMembers changeRecommendedMember =
                changeRecommendedMembersRepository.findByChangeRecommendedMemberId(alterRecommendRequest.getChangeRecommendedMemberID())
                        .orElseThrow(() -> new NoDataException("없는 변경 요청 정보입니다."));

        // 2. referId의 현재 추천인 정보 가져오기
        RecommendedMember currentRecommendedMember = recommendedMemberRepository.findByReferId(changeRecommendedMember.getReferId())
                .orElseThrow(() -> new NoDataException("없는 추천인 정보입니다."));

        logger.info("추천인 변경 로그를 기록합니다.");
        // 로그는 기존의 내용을 그대로 넣고 변경 내용을 적용
        RecommendedMembersAlterLog recommendedMembersAlterLog = new RecommendedMembersAlterLog(currentRecommendedMember, "M");
        recommendedMembersAlterLogRepository.save(recommendedMembersAlterLog);

        logger.info("현재 추천인 정보를 업데이트 합니다.");
        // 현재 추천인 정보 변경
        currentRecommendedMember.setReferredId(changeRecommendedMember.getNewReferredId());
        recommendedMemberRepository.save(currentRecommendedMember);

        logger.info("변경 신청 내역 정보를 업데이트 합니다.");
        // 변경 신청 내역 정보 변경
        changeRecommendedMember.setStatus(alterRecommendRequest.getStatus());
        changeRecommendedMembersRepository.save(changeRecommendedMember);

        logger.info("변경 정보를 업데이트 완료.");
        // 이후 activeType이랑 activeDateTime 넣기
        return new ResponseBody("성공했습니다.");
    }

    @Transactional
    public ResponseListBody listRecommend(RequestList listRecommendRequest){

        logger.info("변경 요청 리스트 반환");

        // pageable 변수 생성
        Pageable pageable = PageRequest.of(
                listRecommendRequest.getPageNo(),
                listRecommendRequest.getPageSize(),
                Sort.by(listRecommendRequest.getSort().equals("ASC") ?
                                Sort.Direction.ASC : Sort.Direction.DESC,
                                listRecommendRequest.getSortValue())
        );

        // page 반환
        Page<ChangeRecommendedMembersList> page = changeRecommendedMembersRepository.findAllWithNames(
                listRecommendRequest.getFilter(),
                listRecommendRequest.getFilterValue(),
                pageable);

        // list 반환
        List<ChangeRecommendedMembersListDto> list = page.stream()
                .map(ChangeRecommendedMembersListDto::new)
                .toList();

        logger.info("변경 요청 리스트 반환 완료");

        return new ResponseListBody(page.getTotalElements(), list);
    }

    @Transactional
    public ResponseBody changeRecommend(ChangeRecommendRequest request){

        logger.info("추천인을 변경합니다.");
        // 2. referId의 현재 추천인 정보 가져오기
        RecommendedMember currentRecommendedMember = recommendedMemberRepository.findByReferId(request.getReferID())
                .orElseThrow(() -> new NoDataException("없는 추천인 정보입니다."));

        logger.info("기존의 추천인 로그를 기록합니다.");
        // 로그는 기존의 내용을 그대로 넣고 변경 내용을 적용
        RecommendedMembersAlterLog recommendedMembersAlterLog = new RecommendedMembersAlterLog(currentRecommendedMember, "M");
        recommendedMembersAlterLogRepository.save(recommendedMembersAlterLog);

        logger.info("추천인 정보를 업데이트 합니다.");
        // 현재 추천인 정보 변경
        currentRecommendedMember.setReferredId(request.getReferredID());
        recommendedMemberRepository.save(currentRecommendedMember);

        logger.info("추천인 변경 완료.");
        // 이후 activeType이랑 activeDateTime 넣기
        return new ResponseBody("성공했습니다.");
    }
}
