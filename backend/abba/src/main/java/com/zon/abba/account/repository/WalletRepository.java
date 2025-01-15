package com.zon.abba.account.repository;

import com.zon.abba.account.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, String> {
    Optional<Wallet> findOneByMemberId(String memberId);

    Wallet getWalletByMemberId(String memberId);

    Wallet getWalletByWalletId(String myWalletId);
}
