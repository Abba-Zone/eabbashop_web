package com.zon.abba.account.repository;

import com.zon.abba.account.entity.Accounts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountsRepository extends JpaRepository<Accounts, String> {

    @Query(value = "SELECT * FROM Accounts " +
            "WHERE MemberID = :memberId " +
            "AND DeleteYN = 'N' " +
            "ORDER BY IsMain DESC, CreatedDateTime DESC",
            nativeQuery = true)
    List<Accounts> findByMemberIdAndActive(@Param("memberId") String memberId);

    @Query(value = "SELECT COUNT(*) FROM Accounts " +
            "WHERE MemberID = :memberId " +
            "AND IsMain = 1 " +
            "AND DeleteYN = 'N'",
            nativeQuery = true)
    int countMainAccountsByMemberId(@Param("memberId") String memberId);

    @Query(value = "SELECT * FROM Accounts " +
            "WHERE MemberID = :memberId " +
            "AND IsMain = :isMain " +
            "AND DeleteYN = 'N' ",
            nativeQuery = true)
    Optional<Accounts> findByMemberIdAndIsMain(@Param("memberId")String memberId,
                                               @Param("isMain")Boolean isMain);
}
