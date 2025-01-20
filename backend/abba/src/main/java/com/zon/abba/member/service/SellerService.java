package com.zon.abba.member.service;

import com.zon.abba.account.entity.Wallet;
import com.zon.abba.account.repository.WalletRepository;
import com.zon.abba.account.service.WalletService;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.exception.NoSellerException;
import com.zon.abba.common.request.RequestList;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseDataBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.commonCode.entity.CommonCode;
import com.zon.abba.commonCode.repository.CommonCodeRepository;
import com.zon.abba.member.dto.SellerDto;
import com.zon.abba.member.dto.SellerListDto;
import com.zon.abba.member.entity.ChangeRecommendedMembers;
import com.zon.abba.member.entity.ChangeRequestLog;
import com.zon.abba.member.entity.Member;
import com.zon.abba.member.mapping.SellerList;
import com.zon.abba.member.repository.ChangeRecommendedMembersRepository;
import com.zon.abba.member.repository.ChangeRequestLogRepository;
import com.zon.abba.member.repository.MemberRepository;
import com.zon.abba.member.repository.SellerRepository;
import com.zon.abba.member.request.email.EmailRequest;
import com.zon.abba.member.request.recommend.AlterRecommendRequest;
import com.zon.abba.member.request.registeradmin.RegisterAdminRequest;
import com.zon.abba.member.request.registeradmin.RegisterAdminRequestAutoRequest;
import com.zon.abba.member.request.registeradmin.RegisterAdminResultRequest;
import com.zon.abba.member.request.seller.SellerDetailRequest;
import com.zon.abba.member.response.SellerDetailResponse;
import com.zon.abba.member.response.registeradmin.RegisterAdminListResponse;
import com.zon.abba.member.response.registeradmin.UpdateResultAdminResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SellerService {
    private static final Logger logger = LoggerFactory.getLogger(SellerService.class);
    private final SellerRepository sellerRepository;
    private final MemberRepository memberRepository;
    private final WalletRepository walletRepository;
    private final CommonCodeRepository commonCodeRepository;
    private final WalletService walletService;
    private final RecommendService recommendService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private ChangeRequestLogRepository changeRequestLogRepository;

    private BigDecimal abz_min;

    @Transactional
    public SellerDto getSeller(String memberId){
        logger.info("member에 맞는 가게를 찾습니다.");

        // memberId로 가게 찾기
        return sellerRepository.findOneByMemberId(memberId)
                .map(SellerDto::new)   // 존재하면 SellerDto로 변환
                .orElse(null);         // 존재하지 않으면 null 반환
    }

    @Transactional
    public ResponseListBody sellerList(RequestList sellerListRequest) {
        logger.info("seller list 반환 시작");

        Pageable pageable = PageRequest.of(
                sellerListRequest.getPageNo(),
                sellerListRequest.getPageSize(),
                Sort.by(sellerListRequest.getSort().equals("ASC") ?
                                Sort.Direction.ASC : Sort.Direction.DESC,
                        sellerListRequest.getSortValue()));

        // 필터링 값 가져오기
        Page<SellerList> sellerLists = sellerRepository.findSellersWithFilter(
                sellerListRequest.getFilter(),
                sellerListRequest.getFilterValue(),
                pageable
        );

        List<SellerListDto> sellerListDtos = sellerLists.getContent()
                .stream()
                .map(SellerListDto::new)
                .toList();

        logger.info("seller list 반환 완료");

        return new ResponseListBody(sellerLists.getTotalElements(), sellerListDtos);
    }

    @Transactional
    public SellerDetailResponse sellerDetail(SellerDetailRequest sellerDetailRequest){
        logger.info("seller detail 반환 시작");

        SellerDetailResponse sellerDetailResponse = sellerRepository.findSellerDetailById(sellerDetailRequest.getSellerID())
                .map(SellerDetailResponse::new)
                .orElseThrow(() -> new NoSellerException("없는 가게 입니다."));

        logger.info("seller detail 반환 완료");

        return sellerDetailResponse;
    }


    @Transactional
    public ResponseListBody requestResultAdminList(String all) {
        logger.info("유저 정보를 가져옵니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));
        List<ChangeRequestLog> ChangeRequestLogList = new ArrayList<>();

        if(all == ""){
            logger.info("로그인한 유저의 대리점을 신청 정보를 가져옵니다.");
            ChangeRequestLogList = changeRequestLogRepository.findByMemberIdAndType(memberId,"A");
            logger.info("대리점 신청결과를 가져왔습니다.");

        }
        else if (all == "all"){
            Member admin = memberRepository.findOneByMemberIdAndRole(memberId,"C")
                    .orElseThrow(() -> new NoMemberException("본사 계정이 아닙니다."));
            ChangeRequestLogList = changeRequestLogRepository.findByType("A");
        }

        List<RegisterAdminListResponse> result = new ArrayList<>();

        for (ChangeRequestLog log : ChangeRequestLogList) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

            String createdDateTime = log.getCreatedDateTime().format(formatter);
            String modifiedDateTime = log.getModifiedDateTime().format(formatter);

            Member member = memberRepository.findOneByMemberId(log.getMemberId())
                    .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

            result.add(new RegisterAdminListResponse(
                    log.getChangeRequestLogId(),
                    log.getStatus(),
                    createdDateTime,
                    modifiedDateTime,
                    member.getMemberId(),
                    member.getFirstName() ,
                    member.getLastName(),
                    member.getPhone(),
                    member.getEmail(),
                    log.getAfterValue()
            ));
        }


        return new ResponseListBody((long) result.size(), result);

    }

    public ResponseDataBody requestResultAdminOld(RegisterAdminRequest request) {
        logger.info("대리점을 신청합니다.");

        logger.info("유저 정보를 가져옵니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        // 추천인 변경
        long changeID = recommendService.requestAlterRecommendReturnID(new EmailRequest(request.getRefferedID()));

        // 신청
        ChangeRequestLog log = ChangeRequestLog.builder()
                .memberId(memberId)
                .afterValue(request.getWantRole()) // 원하는 등급
                .type("A") // 대리점 신청
                .status("1")
                .EtcValue1(Long.toString(changeID))
                .createdId(memberId)
                .modifiedId(memberId)
                .createdDateTime(LocalDateTime.now()) // 현재 시간 설정
                .modifiedDateTime(LocalDateTime.now()) // 현재 시간 설정
                .build();

        changeRequestLogRepository.save(log);

        logger.info("대리점 신청을 완료했습니다..");

        return new ResponseDataBody("성공했습니다.", log.getChangeRequestLogId());
    }

    public ResponseDataBody requestResultAdmin(RegisterAdminRequestAutoRequest request) {
        logger.info("대리점을 신청합니다.");

        logger.info("유저 정보를 가져옵니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        Member member = memberRepository.findByMemberId(memberId);
        Wallet wallet = walletRepository.findOneByMemberId(memberId)
                .orElseThrow(() -> new NoMemberException("지갑이 없는 회원입니다."));

        abz_min = BigDecimal.ZERO;

        String code = "ABZ_B";

        if(IsABZEnough(memberId, code) == false){
            throw new NoMemberException("601", "대리점 신청에 필요한 ABZ포인트가 부족합니다.");
        }

        CommonCode admin = commonCodeRepository.getByCodeGroupAndCode("Setting","002");
        CommonCode adminWallet = commonCodeRepository.getByCodeGroupAndCode("Setting","003");

        walletService.saveABZPointsHistory(memberId, admin.getCodeValue(),  wallet.getWalletId(), adminWallet.getCodeValue(),
                abz_min);

        member.setRole("B");
        member.setModifiedId(memberId);
        member.setModifiedDateTime(LocalDateTime.now());
        memberRepository.save(member);

        ChangeRequestLog log = ChangeRequestLog.builder()
                .memberId(memberId)
                .afterValue("B") // 대리점
                .type("A") // 대리점 신청
                .status("2")
                .createdId(memberId)
                .modifiedId(memberId)
                .createdDateTime(LocalDateTime.now()) // 현재 시간 설정
                .modifiedDateTime(LocalDateTime.now()) // 현재 시간 설정
                .build();
        changeRequestLogRepository.save(log);

        // 추천인 변경
        long changeID = recommendService.requestAlterRecommendReturnID(new EmailRequest(request.getRefferedID()));

        ResponseBody changeRecc = recommendService.alterRecommend(new AlterRecommendRequest(changeID, "2" ));

        if(changeRecc.getMessage() != "성공했습니다."){
            return new ResponseDataBody("실패했습니다.", null);
        }

        logger.info("대리점 신청을 완료했습니다..");

        return new ResponseDataBody("성공했습니다.", log.getChangeRequestLogId());
    }

    @Transactional
    public ResponseDataBody updateResultAdmin(RegisterAdminResultRequest resultRequest) {
        logger.info("대리점을 결과를 설정합니다.");

        logger.info("유저 정보를 가져옵니다.");
        String adminID = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        ChangeRequestLog log = changeRequestLogRepository.findById(resultRequest.getChangeRequestId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 신청입니다."));

        // 1. ABZ 확인
        abz_min = BigDecimal.ZERO;

        //
        String code = "ABZ_B";
        //log.getAfterValue() == "C" ? "001" : "004";
        code = code.replace("_B","_" + log.getAfterValue());


        if(IsABZEnough(log.getMemberId(), code) == false){
            throw new NoMemberException("601", "대리점 신청에 필요한 ABZ포인트가 부족합니다.");
        }

        // ABZ 값 업데이트

        CommonCode admin = commonCodeRepository.getByCodeGroupAndCode("Setting","002");
        CommonCode adminWallet = commonCodeRepository.getByCodeGroupAndCode("Setting","003");

        Wallet wallet = walletRepository.findOneByMemberId(log.getMemberId())
                .orElseThrow(() -> new NoMemberException("지갑이 없는 회원입니다."));

        walletService.saveABZPointsHistory(log.getMemberId(), admin.getCodeValue(),  wallet.getWalletId(), adminWallet.getCodeValue(),
                abz_min);


        // 2. 신청 로그 업데이트
        log.setStatus(resultRequest.getStatus());
        log.setModifiedId(adminID);    // 설정한 사람 (로그인한 유저 : Admin)
        log.setModifiedDateTime(LocalDateTime.now()); // 수정 시간 설정

        changeRequestLogRepository.save(log);

        String result = "거절에 ";
        UpdateResultAdminResponse response = new UpdateResultAdminResponse();

        // 승인이면
        if(resultRequest.getStatus().equals("2")){
            result = "승인에 ";
            // 3. 사용자 role 업데이트
            Member member = memberRepository.findByMemberId(log.getMemberId());
            member.setRole(log.getAfterValue());
            member.setModifiedId(log.getMemberId());
            member.setModifiedDateTime(LocalDateTime.now());

            // 4. 추천인 변경
            ResponseBody changeRecc = recommendService.alterRecommend(new AlterRecommendRequest(Long.parseLong(log.getEtcValue1()), "2" ));

            if(changeRecc.getMessage() != "성공했습니다."){
                return new ResponseDataBody("실패했습니다.", null);
            }

            logger.info("대리점 신청결과 설정을 완료했습니다.");

            response.setChangeRequestLogId(log.getChangeRequestLogId());
            response.setAfterValue(log.getAfterValue());
        }


        return new ResponseDataBody(result + "성공했습니다.", response );
    }

    /// 해당 멤버가 충분한 ABZ 가지고 있는지
    public boolean IsABZEnough(String memberId,String Code){
        Member member = memberRepository.findByMemberId(memberId);
        CommonCode abzValue = commonCodeRepository.getByCodeGroupAndCode("Setting",Code);
        Wallet wallet = walletRepository.findOneByMemberId(memberId)
                .orElseThrow(() -> new NoMemberException("지갑이 없는 회원입니다."));

        abz_min = BigDecimal.ZERO;

        if(abzValue.getCodeValue() != null && abzValue.getCodeValue() != ""){
            abz_min = new BigDecimal(abzValue.getCodeValue());
        }

        if(wallet.getAbz().compareTo(abz_min) < 0){
            return false;
        }

        return true;
    }

}

