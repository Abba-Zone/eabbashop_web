package com.zon.abba.member.repository;

import com.zon.abba.member.entity.ChangeRecommendedMembers;
import com.zon.abba.member.mapping.ChangeRecommendedMembersList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ChangeRecommendedMembersRepository extends JpaRepository<ChangeRecommendedMembers, Long> {

    @Query(value = "SELECT c.ChangeRecommendedMemberID AS changeRecommendedMemberId, " +
            "       CONCAT(m1.LastName, ' ', m1.FirstName) AS referredName, " +
            "       CONCAT(m2.LastName, ' ', m2.FirstName) AS referName, " +
            "       c.Status AS status, " +
            "       c.CreatedDateTime AS createdDateTime " +
            "FROM ChangeRecommendedMembers c " +
            "LEFT JOIN members m1 ON c.NewReferredID = m1.MemberID " +
            "LEFT JOIN members m2 ON c.ReferID = m2.MemberID " +
            "WHERE (:filter = 'referredName' AND CONCAT(m1.LastName, ' ', m1.FirstName) LIKE %:filterValue%) " +
            "   OR (:filter = 'referName' AND CONCAT(m2.LastName, ' ', m2.FirstName) LIKE %:filterValue%) " +
            "   OR (:filter = 'status' AND c.Status LIKE %:filterValue%)",
            countQuery = "SELECT COUNT(*) " +
                    "FROM ChangeRecommendedMembers c " +
                    "LEFT JOIN members m1 ON c.NewReferredID = m1.MemberID " +
                    "LEFT JOIN members m2 ON c.ReferID = m2.MemberID " +
                    "WHERE (:filter = 'referredName' AND CONCAT(m1.LastName, ' ', m1.FirstName) LIKE %:filterValue%) " +
                    "   OR (:filter = 'referName' AND CONCAT(m2.LastName, ' ', m2.FirstName) LIKE %:filterValue%) " +
                    "   OR (:filter = 'status' AND c.Status LIKE %:filterValue%)",
            nativeQuery = true)
    Page<ChangeRecommendedMembersList> findAllWithNames(Pageable pageable);

    Optional<ChangeRecommendedMembers> findByChangeRecommendedMemberId(Long changeRecommendedMemberId);
}
