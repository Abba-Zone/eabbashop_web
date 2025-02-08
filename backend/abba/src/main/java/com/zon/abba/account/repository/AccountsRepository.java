package com.zon.abba.account.repository;

import com.zon.abba.account.entity.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountsRepository extends JpaRepository<Accounts, String> {

    @Query(value = "SELECT * FROM Accounts a " +
            "WHERE a.DeleteYN = 'N' " +
            "AND a.ActiveYN = 'Y' " +
            "AND a.MemberID = :memberId " +
            "ORDER BY a.CreatedDateTime DESC",
    nativeQuery = true)
    List<Accounts> findByMemberIdAndActive(@Param("memberId") String memberId);
}
