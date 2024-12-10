package com.zon.abba.members.service;

import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.members.entity.Member;
import com.zon.abba.members.repository.MemberRepository;
import com.zon.abba.members.request.EmailRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RecommendService {

    private MemberRepository memberRepository;

    public boolean checkMember(EmailRequest emailRequest){
        // 유저 이메일을 바탕으로 member 체크
        Optional<Member> memberOptional = memberRepository.findByEmail(emailRequest.getEmail());
        if(memberOptional.isEmpty()) {
            return false;
        }else return true;
    }
}
