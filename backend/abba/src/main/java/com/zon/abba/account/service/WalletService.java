package com.zon.abba.account.service;

import com.zon.abba.account.dto.WalletDto;
import com.zon.abba.account.entity.Wallet;
import com.zon.abba.account.repository.WalletRepository;
import com.zon.abba.account.response.WalletResponse;
import com.zon.abba.address.service.AddressService;
import com.zon.abba.common.exception.NoDataException;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.common.security.JwtTokenProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WalletService {
    private static final Logger logger = LoggerFactory.getLogger(WalletService.class);

    private final WalletRepository walletRepository;
    private JwtTokenProvider jwtTokenProvider;

    @Transactional
    public WalletDto getWallet(String memberId){
        logger.info("member에 맞는 지갑 정보를 가져옵니다.");

        return walletRepository.findOneByMemberId(memberId)
                .map(WalletDto::new)
                .orElseThrow(() -> new NoDataException("없는 정보입니다."));
    }

    @Transactional
    public WalletResponse getMyWallet(){
        logger.info("지갑 정보를 출력합니다.");
        logger.info("회원 정보를 가져옵니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        return new WalletResponse(getWallet(memberId));
    }

    @Transactional
    public ResponseListBody getWalletList(){
        return null;
    }
}
