package com.zon.abba.member.service;

import com.zon.abba.account.dto.WalletDto;
import com.zon.abba.account.service.WalletService;
import com.zon.abba.address.dto.AddressDto;
import com.zon.abba.address.service.AddressService;
import com.zon.abba.common.exception.InvalidMemberException;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.request.RequestList;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.member.dto.MemberInfoDto;
import com.zon.abba.member.dto.SellerDto;
import com.zon.abba.member.entity.Member;
import com.zon.abba.member.repository.MemberRepository;
import com.zon.abba.member.repository.RecommendedMemberRepository;
import com.zon.abba.member.request.email.FindEmailRequest;
import com.zon.abba.member.request.member.*;
import com.zon.abba.member.response.EmailResponse;
import com.zon.abba.member.response.MemberDetailResponse;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {

    private static final Logger logger = LoggerFactory.getLogger(MemberService.class);
    private final MemberRepository memberRepository;
    private final RecommendedMemberRepository recommendedMemberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final SellerService sellerService;
    private final WalletService walletService;
    private final AddressService addressService;

    @Transactional
    public MemberDetailResponse detailMember(String memberId){
        logger.info("유저 정보를 받아옵니다. {}", memberId);

        MemberInfoDto memberDto = memberRepository.findOneByMemberId(memberId)
                .map(MemberInfoDto::new)
                .orElseThrow(() -> new NoMemberException("없는 회원 정보입니다."));

        // recommend email 받아오기.
        memberDto.setRecommend(recommendedMemberRepository.findEmailByReferIdNative(memberId).orElse(null));

        // seller 정보 가져오기
        SellerDto sellerDto = sellerService.getSeller(memberId);

        // wallet 정보 가져오기
        WalletDto walletDto = walletService.getWallet(memberId);

        // address 리스트 가져오기
        List<AddressDto> addressDtoList = addressService.getAddressList(memberId);

        return new MemberDetailResponse(memberDto, sellerDto, walletDto, addressDtoList);
    }

    @Transactional
    public MemberDetailResponse detailMe(){
        logger.info("내 정보를 받아옵니다 : {}", jwtTokenProvider.getCurrentEmail().get());

        MemberInfoDto memberDto = jwtTokenProvider.getCurrentEmail().flatMap(memberRepository::findByEmail)
                .map(MemberInfoDto::new)
                .orElseThrow(() -> new NoMemberException("없는 회원 정보입니다."));

        // recommend email 받아오기.
        memberDto.setRecommend(recommendedMemberRepository.findEmailByReferIdNative(memberDto.getMemberID()).orElse(null));

        // seller 정보 가져오기
        SellerDto sellerDto = sellerService.getSeller(memberDto.getMemberID());

        // wallet 정보 가져오기
        WalletDto walletDto = walletService.getWallet(memberDto.getMemberID());

        // address 리스트 가져오기
        List<AddressDto> addressDtoList = addressService.getAddressList(memberDto.getMemberID());

        return new MemberDetailResponse(memberDto, sellerDto, walletDto, addressDtoList);
    }

    @Transactional
    public ResponseListBody memberList(RequestList memberListRequest){
        logger.info("member list를 조회합니다.");
        // Pageable 객체 생성
        Pageable pageable = PageRequest.of(
                memberListRequest.getPageNo(),              // 페이지 번호
                memberListRequest.getPageSize(),            // 페이지 크기
                Sort.by(memberListRequest.getSort().equals("ASC") ?
                        Sort.Direction.ASC : Sort.Direction.DESC,
                        memberListRequest.getSortValue()) // 정렬 기준
        );

        // 필터링된 데이터를 가져옴
        Page<Member> memberPage = memberRepository.findAllWithFilter(
                memberListRequest.getFilter(),
                memberListRequest.getFilterValue(),
                pageable
        );
        List<MemberInfoDto> memberDtoList = memberPage.getContent()
                .stream()
                .map(MemberInfoDto::new)
                .collect(Collectors.toList());

        logger.info("member list가 완료되었습니다.");
        return new ResponseListBody(memberPage.getTotalElements(), memberDtoList);
    }


    @Transactional
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

        memberRepository.save(member);

        logger.info("유저 정보 업데이트 완료");
        return new ResponseBody("성공했습니다.");
    }

    @Transactional
    public ResponseBody updateMemberRole(MemberRoleRequest memberRoleRequest){
        logger.info("유저 역할을 업데이트합니다.");

        Member member = memberRepository.findOneByMemberId(memberRoleRequest.getMemberID())
                .orElseThrow(() -> new NoMemberException("없는 회원 정보입니다."));

        // 요청 정보 업데이트
        member.setRole(memberRoleRequest.getRole());

        memberRepository.save(member);

        logger.info("유저 역할 업데이트 완료");
        return new ResponseBody("성공했습니다.");
    }

    @Transactional
    public ResponseBody updateMemberGrade(MemberGradeRequest memberGradeRequest){
        logger.info("유저 등급을 업데이트합니다.");

        Member member = memberRepository.findOneByMemberId(memberGradeRequest.getMemberID())
                .orElseThrow(() -> new NoMemberException("없는 회원 정보입니다."));

        // 요청 정보 업데이트
        member.setGrade(memberGradeRequest.getGrade());

        memberRepository.save(member);

        logger.info("유저 등급 업데이트 완료");
        return new ResponseBody("성공했습니다.");
    }

    @Transactional
    public ResponseBody updateMemberPassword(MemberPasswordRequest memberPasswordRequest){
        logger.info("유저 비밀번호를 업데이트합니다.");

        Member member = memberRepository.findByEmail(memberPasswordRequest.getEmail())
                .orElseThrow(() -> new NoMemberException("없는 회원 정보입니다."));

        // 요청 정보 업데이트
        member.setGrade(memberPasswordRequest.getPassword());

        memberRepository.save(member);

        logger.info("유저 비밀번호 업데이트 완료");
        return new ResponseBody("성공했습니다.");
    }

    @Transactional
    public EmailResponse findEmail(FindEmailRequest findEmailRequest){
        logger.info("유저 이메일을 찾습니다.");

        Member member = memberRepository.findByPhone(findEmailRequest.getPhone())
                .orElseThrow(() -> new NoMemberException("없는 회원 정보입니다."));

        if(!member.getFirstName().equals(findEmailRequest.getFirstName()) ||
        !member.getLastName().equals(findEmailRequest.getLastName())){
            throw new InvalidMemberException("회원 정보가 일치하지 않습니다.");
        }
        // valid 체크가 끝난다면 회원 정보 리턴
        logger.info("유저 이메일 찾기 완료");
        return new EmailResponse(member.getEmail());
    }

    @Transactional
    public ResponseBody withdraw(){
        logger.info("회원 정보를 탈퇴합니다.");

        Member member = jwtTokenProvider.getCurrentEmail()
                .flatMap(memberRepository::findByEmail)
                .orElseThrow(() -> new NoMemberException("없는 회원 정보입니다."));

        // 요청 정보 업데이트
        member.setDeleteYN("Y");


        memberRepository.save(member);

        logger.info("회원 정보를 탈퇴 완료");

        return new ResponseBody("성공했습니다.");
    }

}
