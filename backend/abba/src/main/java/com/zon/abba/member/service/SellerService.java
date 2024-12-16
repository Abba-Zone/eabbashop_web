package com.zon.abba.member.service;

import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.member.dto.SellerDto;
import com.zon.abba.member.entity.Seller;
import com.zon.abba.member.repository.SellerRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

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
}

