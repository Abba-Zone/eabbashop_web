package com.zon.abba.account.repository;

import com.zon.abba.account.entity.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountsRepository extends JpaRepository<Accounts, String> {

    @Query("SELECT a FROM Accounts a " +
            "WHERE a.deleteYN = 'N' " +
            "AND a.activeYN = 'Y' " +
            "AND a.memberId = :memberId " +
            "ORDER BY a.createdDateTime DESC")
    List<Accounts> findByMemberIdAndActive(@Param("memberId") String memberId);
}
