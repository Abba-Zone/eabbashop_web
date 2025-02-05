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
        WITH RECURSIVE parent_chain AS (
            -- 초기값: referID의 부모와 부모의 Role 가져오기
            SELECT 
                rm.ReferID AS referId, 
                rm.ReferredID AS referredId, 
                COALESCE(m_referred.Role, '') AS referredRole, -- referredID가 NULL이면 빈 문자열 반환
                0 AS depth 
            FROM RecommendedMembers rm 
            LEFT JOIN Members m_referred ON rm.ReferredID = m_referred.MemberID 
            WHERE rm.ReferID = :referId -- 특정 referId 입력

            UNION ALL

            -- 부모를 찾는 재귀 부분
            SELECT 
                rm.ReferID, 
                rm.ReferredID, 
                COALESCE(m_referred.Role, '') AS referredRole, -- referredID가 NULL이면 빈 문자열 반환
                pc.depth + 1 
            FROM RecommendedMembers rm 
            JOIN parent_chain pc ON rm.ReferID = pc.referredId -- 부모 찾기
            LEFT JOIN Members m_referred ON rm.ReferredID = m_referred.MemberID 
        )
        SELECT * FROM parent_chain 
        ORDER BY depth ASC;
        """, nativeQuery = true)
    List<ParentTree> findParentTreeWithReferredRoleForZone(@Param("referId") String referId);
}
