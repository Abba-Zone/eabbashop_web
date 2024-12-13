package com.zon.abba.member.repository;

import com.zon.abba.member.entity.RecommendedMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecommendedMemberRepository extends JpaRepository<RecommendedMember, String> {
    @Query(value = "SELECT m.email " +
            "FROM recommendedmember rm " +
            "JOIN members m ON rm.referredID = m.member_id " +
            "WHERE rm.referID = :memberId",
            nativeQuery = true)
    Optional<String> findEmailByReferIdNative(@Param("memberId") String memberId);
}
