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
                COALESCE(m_refer.Role, '') AS referRole, 
                m_refer.FirstName AS firstName, 
                m_refer.LastName AS lastName, 
                m_refer.Email AS email, 
                0 AS depth 
            FROM RecommendedMembers rm 
            LEFT JOIN Members m_refer ON rm.ReferID = m_refer.MemberID 
            WHERE rm.ReferID = :referId -- 특정 referId 입력

            UNION ALL

            -- 부모를 찾는 재귀 부분
            SELECT 
                rm.ReferID, 
                rm.ReferredID, 
                COALESCE(m_refer.Role, '') AS referRole, 
                m_refer.FirstName, 
                m_refer.LastName, 
                m_refer.Email, 
                pc.depth + 1 
            FROM RecommendedMembers rm 
            JOIN parent_chain pc ON rm.ReferID = pc.referredId -- 부모 찾기
            LEFT JOIN Members m_refer ON rm.ReferID = m_refer.MemberID 
        )
        SELECT * FROM parent_chain 
        WHERE depth > 0 
        ORDER BY depth ASC;
        """, nativeQuery = true)
    List<ParentTree> findParentTreeWithReferredRoleForZone(@Param("referId") String referId);

    @Query(value = """
        WITH RECURSIVE parent_chain AS (
            -- 부모를 찾는 재귀 쿼리
            SELECT 
                rm.ReferID AS referId,
                rm.ReferredID AS referredId,
                COALESCE(m_refer.Role, '') AS referRole,
                m_refer.FirstName AS firstName, 
                m_refer.LastName AS lastName, 
                m_refer.Email AS email, 
                0 AS depth
            FROM RecommendedMembers rm
            LEFT JOIN Members m_refer ON rm.ReferID = m_refer.MemberID
            WHERE rm.ReferID = :referId  -- 특정 referID 입력

            UNION ALL

            -- 부모 탐색 (재귀)
            SELECT 
                rm.ReferID,
                rm.ReferredID,
                COALESCE(m_refer.Role, '') AS referRole,
                m_refer.FirstName, 
                m_refer.LastName, 
                m_refer.Email,
                pc.depth + 1
            FROM RecommendedMembers rm
            JOIN parent_chain pc ON rm.ReferID = pc.referredId
            LEFT JOIN Members m_refer ON rm.ReferID = m_refer.MemberID
        ),
        child_chain AS (
            -- 자식을 찾는 재귀 쿼리
            SELECT 
                rm.ReferID AS referId,
                rm.ReferredID AS referredId,
                COALESCE(m_refer.Role, '') AS referRole, 
                m_refer.FirstName AS firstName, 
                m_refer.LastName AS lastName, 
                m_refer.Email AS email, 
                0 AS depth
            FROM RecommendedMembers rm
            LEFT JOIN Members m_refer ON rm.ReferID = m_refer.MemberID
            WHERE rm.ReferID = :referId  -- 특정 referID 입력

            UNION ALL

            -- 자식 탐색 (재귀)
            SELECT 
                rm.ReferID,
                rm.ReferredID,
                COALESCE(m_refer.Role, '') AS referRole,
                m_refer.FirstName, 
                m_refer.LastName, 
                m_refer.Email,
                cc.depth - 1
            FROM RecommendedMembers rm
            JOIN child_chain cc ON rm.ReferredID = cc.referId
            LEFT JOIN Members m_refer ON rm.ReferID = m_refer.MemberID
        )

        -- 부모 + 현재 노드 + 자식들 모두 가져오기
        SELECT * FROM parent_chain 
        UNION 
        SELECT * FROM child_chain 
        ORDER BY depth ASC
        """, nativeQuery = true)
    List<ParentTree> findParentAndChildTree(@Param("referId") String referId);
}
