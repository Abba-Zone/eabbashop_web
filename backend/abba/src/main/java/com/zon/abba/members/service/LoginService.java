package com.zon.abba.members.service;

import com.zon.abba.common.exception.FailPasswordException;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.exception.SignupException;
import com.zon.abba.common.redis.RedisService;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.members.client.GoogleClient;
import com.zon.abba.members.client.KakaoClient;
import com.zon.abba.members.dto.MemberDto;
import com.zon.abba.members.entity.Member;
import com.zon.abba.members.repository.MemberRepository;
import com.zon.abba.members.request.LoginRequest;
import com.zon.abba.members.response.KakaoMemberInfoResponse;
import com.zon.abba.members.response.GoogleMemberInfoResponse;
import com.zon.abba.members.response.LoginResponse;
import com.zon.abba.members.response.SignupResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.security.auth.login.LoginException;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LoginService {
    private static final Logger logger = LoggerFactory.getLogger(LoginService.class);

    private final GoogleClient googleClient;
    private final KakaoClient kakaoClient;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final RedisService redisService;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    private LoginResponse makeToken(MemberDto memberDto){
        // 사용자 인증
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        memberDto.getEmail(),
                        memberDto.getPassword()
                )
        );
        // 인증 정보 설정
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // JWT 토큰 생성
        String accessToken = tokenProvider.createAccessToken(authentication);
        String refreshToken = tokenProvider.createRefreshToken(authentication);

        // 레디스에 리프레쉬 토큰 저장 과정 추가 예정
        redisService.save(refreshToken, memberDto.getEmail());

        return new LoginResponse(
                accessToken,
                refreshToken,
                memberDto.getFirstName(),
                memberDto.getLastName(),
                memberDto.getRole()
        );
    }

    @Transactional
    public LoginResponse login(LoginRequest loginRequest){
        // 1. 유저 정보를 받아온다.
        Member member = memberRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        // 2. 비밀번호 검증
        if (!passwordEncoder.matches(loginRequest.getPassword(), member.getPassword())) {
            // 비밀번호가 틀리면 failCount를 증가시키고 저장
            member.setFailCount(member.getFailCount() + 1);
            memberRepository.save(member);
            throw new FailPasswordException("비밀번호가 틀렸습니다.");
        }

        // 3. 비밀번호 검증 성공 시 failCount 초기화 및 lastLoginTime 업데이트
        member.setFailCount(0); // 실패 횟수 초기화
        member.setLastLoginTime(LocalDateTime.now()); // 마지막 로그인 시간 갱신
        memberRepository.save(member);

        // 4. DTO 변환 및 토큰 생성
        MemberDto memberDto = new MemberDto(member);
        return makeToken(memberDto);
    }

    @Transactional
    public LoginResponse googleLogin(String code) throws LoginException {
        String googleAccessToken = googleClient.requestGoogleAccessToken(code);
        GoogleMemberInfoResponse member = googleClient.requestGoogleUserInfo(googleAccessToken);
        logger.info(googleAccessToken);
        // 유저 정보를 토대로 토큰 정보 확인
        Optional<Member> memberOptional = memberRepository.findByEmail(member.getEmail());

        // memberOptional이 비어있으면 예외 던지기 SignupException
        MemberDto memberDto = memberOptional
                .map(MemberDto::new)
                .orElseThrow(()-> new SignupException("회원 가입 해주세요.", new SignupResponse(
                    member.getGivenName(),
                    member.getFamilyName(),
                    member.getEmail(),
                    member.getId(),
                    "google"
                )));

        return makeToken(memberDto);
    }

    @Transactional
    public LoginResponse kakaoLogin(String code) throws LoginException {
        String kakaoAccessToken = kakaoClient.requestKakaoAccessToken(code);
        logger.info(kakaoAccessToken);
        KakaoMemberInfoResponse member = kakaoClient.requestKakaoUserInfo(kakaoAccessToken);

        // 유저 정보를 토대로 토큰 정보 확인
        Optional<Member> memberOptional = memberRepository.findByEmail(member.getKakaoAccount().getEmail());

        // memberOptional이 비어있으면 예외 던지기 SignupException
        MemberDto memberDto = memberOptional
                .map(MemberDto::new)
                .orElseThrow(()-> new SignupException("회원 가입 해주세요.", new SignupResponse(
                        member.getKakaoAccount().getProfile().getNickName(),
                        member.getKakaoAccount().getProfile().getNickName(),
                        member.getKakaoAccount().getEmail(),
                        String.valueOf(member.getId()),
                        "kakao"
                )));

        return makeToken(memberDto);
    }
}