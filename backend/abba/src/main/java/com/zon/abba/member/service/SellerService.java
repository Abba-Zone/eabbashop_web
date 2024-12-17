package com.zon.abba.member.service;

import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.exception.NoSellerException;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.member.dto.SellerDto;
import com.zon.abba.member.dto.SellerListDto;
import com.zon.abba.member.entity.Seller;
import com.zon.abba.member.mapping.SellerList;
import com.zon.abba.member.repository.SellerRepository;
import com.zon.abba.member.request.seller.SellerDetailRequest;
import com.zon.abba.member.request.seller.SellerListRequest;
import com.zon.abba.member.response.SellerDetailResponse;
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
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SellerService {
    private static final Logger logger = LoggerFactory.getLogger(SellerService.class);
    private final SellerRepository sellerRepository;

    @Transactional
    public SellerDto getSeller(String memberId){
        logger.info("member에 맞는 가게를 찾습니다.");

        // memberId로 가게 찾기
        return sellerRepository.findOneByMemberId(memberId)
                .map(SellerDto::new)   // 존재하면 SellerDto로 변환
                .orElse(null);         // 존재하지 않으면 null 반환
    }

    @Transactional
    public ResponseListBody sellerList(SellerListRequest sellerListRequest) {
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
}

