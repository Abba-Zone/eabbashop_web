package com.zon.abba.member.service;

import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.exception.NoSellerException;
import com.zon.abba.common.request.RequestList;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.member.dto.SellerDto;
import com.zon.abba.member.dto.SellerListDto;
import com.zon.abba.member.entity.ChangeRequestLog;
import com.zon.abba.member.entity.Member;
import com.zon.abba.member.mapping.SellerList;
import com.zon.abba.member.repository.ChangeRequestLogRepository;
import com.zon.abba.member.repository.MemberRepository;
import com.zon.abba.member.repository.SellerRepository;
import com.zon.abba.member.request.registeradmin.RegisterAdminResultRequest;
import com.zon.abba.member.request.seller.SellerDetailRequest;
import com.zon.abba.member.response.SellerDetailResponse;
import com.zon.abba.member.response.registeradmin.RegisterAdminListResponse;
import com.zon.abba.product.entity.Product;
import com.zon.abba.product.request.ProductRegisterRequest;
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

    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private ChangeRequestLogRepository changeRequestLogRepository;

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

            result.add(new RegisterAdminListResponse(
                    log.getChangeRequestLogId(),
                    log.getStatus(),
                    createdDateTime,
                    modifiedDateTime
            ));
        }


        return new ResponseListBody((long) result.size(), result);

    }

    public ResponseBody requestResultAdmin() {
        logger.info("대리점을 신청합니다.");

        logger.info("유저 정보를 가져옵니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        ChangeRequestLog log = ChangeRequestLog.builder()
                .memberId(memberId)
                .afterValue("B") // 대리점
                .type("A") // 대리점 신청
                .status("1")
                .createdId(memberId)
                .modifiedId(memberId)
                .createdDateTime(LocalDateTime.now()) // 현재 시간 설정
                .modifiedDateTime(LocalDateTime.now()) // 현재 시간 설정
                .build();
        changeRequestLogRepository.save(log);

        logger.info("대리점 신청을 완료했습니다..");

        return new ResponseBody("성공했습니다.");
    }

    @Transactional
    public ResponseBody updateResultAdmin(RegisterAdminResultRequest resultRequest) {
        logger.info("대리점을 결과를 설정합니다.");

        logger.info("유저 정보를 가져옵니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        ChangeRequestLog log = changeRequestLogRepository.findById(resultRequest.getChangeRequestId())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 신청입니다."));

        log.setStatus(resultRequest.getValue());
        log.setModifiedId(memberId);    // 설정한 사람 (로그인한 유저)
        log.setModifiedDateTime(LocalDateTime.now()); // 수정 시간 설정

        changeRequestLogRepository.save(log);

        logger.info("대리점 신청결과 설정을 완료했습니다.");

        return new ResponseBody("성공했습니다.");
    }

}

