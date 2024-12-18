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
            "       CONCAT(m1.FirstName, ' ', m1.LastName) AS referredName, " +
            "       CONCAT(m2.FirstName, ' ', m2.LastName) AS referName, " +
            "       c.Status AS status, " +
            "       c.CreatedDateTime AS createdDateTime " +
            "FROM ChangeRecommendedMembers c " +
            "LEFT JOIN Members m1 ON c.NewReferredID = m1.MemberID " +
            "LEFT JOIN Members m2 ON c.ReferID = m2.MemberID " +
            "WHERE c.DeleteYN = 'N' AND c.ActiveYN = 'Y'",
            countQuery = "SELECT COUNT(*) " +
                    "FROM ChangeRecommendedMembers c " +
                    "LEFT JOIN Members m1 ON c.NewReferredID = m1.MemberID " +
                    "LEFT JOIN Members m2 ON c.ReferID = m2.MemberID " +
                    "WHERE c.DeleteYN = 'N' AND c.ActiveYN = 'Y'",
            nativeQuery = true)
    Page<ChangeRecommendedMembersList> findAllWithNames(Pageable pageable);

    Optional<ChangeRecommendedMembers> findByChangeRecommendedMemberId(Long changeRecommendedMemberId);
}
