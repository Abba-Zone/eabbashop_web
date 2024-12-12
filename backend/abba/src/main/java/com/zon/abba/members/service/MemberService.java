package com.zon.abba.members.service;

import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.members.entity.Member;
import com.zon.abba.members.repository.MembersRepository;
import com.zon.abba.members.request.MemberInfoRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private static final Logger logger = LoggerFactory.getLogger(MemberService.class);
    private final MembersRepository membersRepository;
    private final JwtTokenProvider jwtTokenProvider;


    public ResponseBody updateMemberInfo(MemberInfoRequest memberInfoRequest){
        logger.info("유저 정보를 업데이트합니다.");

        Optional<Member> member= jwtTokenProvider.getCurrentEmail().orElseThrow();
    }

}
