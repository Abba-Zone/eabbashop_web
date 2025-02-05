package com.zon.abba.member.repository;

import com.zon.abba.member.entity.RecommendedMember;
import com.zon.abba.member.mapping.ParentTree;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RecommendedMemberRepository extends JpaRepository<RecommendedMember, String> {
    @Query(value = "SELECT m.email " +
            "FROM RecommendedMembers rm " +
            "JOIN Members m ON rm.referredID = m.MemberID " +
            "WHERE rm.referID = :memberId",
            nativeQuery = true)
    Optional<String> findEmailByReferIdNative(@Param("memberId") String memberId);

    Optional<RecommendedMember> findByReferId(String referId);

    @Query(value = """
        WITH RECURSIVE ParentTree AS (
            SELECT RecommendedMemberID, ReferredID, ReferID
            FROM RecommendedMembers
            WHERE ReferID = :referId
            UNION ALL
            SELECT rm.RecommendedMemberID, rm.ReferredID, rm.ReferID
            FROM RecommendedMembers rm
            JOIN ParentTree pt ON rm.ReferID = pt.ReferredID
        )
        SELECT * FROM ParentTree;
    """, nativeQuery = true)
    List<ParentTree> findParentHierarchy(@Param("referId") String referId);
}
