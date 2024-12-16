package com.zon.abba.account.service;

import com.zon.abba.account.dto.WalletDto;
import com.zon.abba.account.repository.WalletRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WalletService {
    private static final Logger logger = LoggerFactory.getLogger(WalletService.class);

    private final WalletRepository walletRepository;

    @Transactional
    public WalletDto getWallet(String memberId){
        // memberId로 지갑찾기
        logger.info("member에 맞는 지갑을 찾습니다.");

        // memberId로 가게 찾기
        return walletRepository.findOneByMemberId(memberId)
                .map(WalletDto::new)   // 존재하면 SellerDto로 변환
                .orElse(null);         // 존재하지 않으면 null 반환

    }
}
