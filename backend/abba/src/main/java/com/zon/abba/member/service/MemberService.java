package com.zon.abba.member.service;

import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.member.entity.Member;
import com.zon.abba.member.repository.MemberRepository;
import com.zon.abba.member.request.MemberGradeRequest;
import com.zon.abba.member.request.MemberInfoRequest;
import com.zon.abba.member.request.MemberRoleRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class MemberService {

    private static final Logger logger = LoggerFactory.getLogger(MemberService.class);
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;


    public ResponseBody updateMemberInfo(MemberInfoRequest memberInfoRequest){
        logger.info("유저 정보를 업데이트합니다.");

        Member member = jwtTokenProvider.getCurrentEmail()
                .flatMap(memberRepository::findByEmail)
                .orElseThrow(() -> new NoMemberException("없는 회원 정보입니다."));

        // 요청 정보 업데이트
        member.setFirstName(memberInfoRequest.getFirstName());
        member.setLastName(memberInfoRequest.getLastName());
        member.setPhone(memberInfoRequest.getPhone());
        member.setPassword(memberInfoRequest.getPassword());
        member.setModifiedDateTime(LocalDateTime.now());

        memberRepository.save(member);

        logger.info("유저 정보 업데이트 완료");
        return new ResponseBody("성공했습니다.");
    }

    public ResponseBody updateMemberRole(MemberRoleRequest memberRoleRequest){
        logger.info("유저 역할을 업데이트합니다.");

        Member member = memberRepository.findOneByMemberId(memberRoleRequest.getMemberID())
                .orElseThrow(() -> new NoMemberException("없는 회원 정보입니다."));

        // 요청 정보 업데이트
        member.setRole(memberRoleRequest.getRole());
        member.setModifiedDateTime(LocalDateTime.now());

        memberRepository.save(member);

        logger.info("유저 역할 업데이트 완료");
        return new ResponseBody("성공했습니다.");
    }

    public ResponseBody updateMemberGrade(MemberGradeRequest memberGradeRequest){
        logger.info("유저 등급을 업데이트합니다.");

        Member member = memberRepository.findOneByMemberId(memberGradeRequest.getMemberID())
                .orElseThrow(() -> new NoMemberException("없는 회원 정보입니다."));

        // 요청 정보 업데이트
        member.setGrade(memberGradeRequest.getGrade());
        member.setModifiedDateTime(LocalDateTime.now());

        memberRepository.save(member);

        logger.info("유저 등급 업데이트 완료");
        return new ResponseBody("성공했습니다.");
    }

}
