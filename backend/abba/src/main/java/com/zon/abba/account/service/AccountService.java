package com.zon.abba.account.service;

import com.zon.abba.account.dto.AccountDto;
import com.zon.abba.account.entity.Accounts;
import com.zon.abba.account.repository.AccountsRepository;
import com.zon.abba.account.repository.WalletRepository;
import com.zon.abba.account.request.AccountRequest;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.common.security.JwtTokenProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {
    private static final Logger logger = LoggerFactory.getLogger(AccountService.class);

    private final JwtTokenProvider jwtTokenProvider;
    private final AccountsRepository accountsRepository;

    @Transactional
    public Accounts createAccount(AccountRequest request){
        logger.info("계좌를 추가합니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        Accounts accounts = Accounts.builder()
                .memberId(memberId)
                .bank(request.getBank())
                .accountNumber(request.getAccountNumber())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .createdId(memberId)
                .modifiedId(memberId)
                .build();

        accountsRepository.save(accounts);
        return accounts;
    }

    @Transactional
    public ResponseBody registerAccount(AccountRequest request){
        logger.info("계좌 등록을 시도합니다.");

        Accounts accounts = createAccount(request);

        return new ResponseBody("성공했습니다.");
    }

    @Transactional
    public ResponseListBody accountList(){
        logger.info("계좌 목록을 조회합니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        List<Accounts> accounts = accountsRepository.findByMemberIdAndActive(memberId);

        List<AccountDto> list = accounts.stream()
                .map(AccountDto::new)
                .toList();

        return new ResponseListBody((long) list.size(), list);
    }
}
