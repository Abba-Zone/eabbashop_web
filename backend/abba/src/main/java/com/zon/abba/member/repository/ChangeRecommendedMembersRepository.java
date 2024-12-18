package com.zon.abba.member.repository;

import com.zon.abba.member.entity.ChangeRecommendedMembers;
import com.zon.abba.member.mapping.ChangeRecommendedMembersList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ChangeRecommendedMembersRepository extends JpaRepository<ChangeRecommendedMembers, Long> {

    @Query(value = "SELECT c.ChangeRecommendedMemberID AS changeRecommendedMemberId, " +
            "       CONCAT(m1.LastName, ' ', m1.FirstName) AS referredName, " +
            "       CONCAT(m2.LastName, ' ', m2.FirstName) AS referName, " +
            "       c.Status AS status, " +
            "       c.CreatedDateTime AS createdDateTime " +
            "FROM ChangeRecommendedMembers c " +
            "LEFT JOIN Members m1 ON c.NewReferredID = m1.MemberID " +
            "LEFT JOIN Members m2 ON c.ReferID = m2.MemberID " +
            "WHERE :filter IS NULL OR " +
            "      CASE " +
            "          WHEN :filter = 'referredName' THEN CONCAT(m1.LastName, ' ', m1.FirstName) LIKE CONCAT('%', :filterValue, '%') " +
            "          WHEN :filter = 'referName' THEN CONCAT(m2.LastName, ' ', m2.FirstName) LIKE CONCAT('%', :filterValue, '%') " +
            "          WHEN :filter = 'status' THEN c.Status LIKE CONCAT('%', :filterValue, '%') " +
            "      END",
            countQuery = "SELECT COUNT(*) " +
                    "FROM ChangeRecommendedMembers c " +
                    "LEFT JOIN Members m1 ON c.NewReferredID = m1.MemberID " +
                    "LEFT JOIN Members m2 ON c.ReferID = m2.MemberID " +
                    "WHERE :filter IS NULL OR " +
                    "      CASE " +
                    "          WHEN :filter = 'referredName' THEN CONCAT(m1.LastName, ' ', m1.FirstName) LIKE CONCAT('%', :filterValue, '%') " +
                    "          WHEN :filter = 'referName' THEN CONCAT(m2.LastName, ' ', m2.FirstName) LIKE CONCAT('%', :filterValue, '%') " +
                    "          WHEN :filter = 'status' THEN c.Status LIKE CONCAT('%', :filterValue, '%') " +
                    "      END",
            nativeQuery = true)
    Page<ChangeRecommendedMembersList> findAllWithNames(@Param("filter") String filter,
                                                        @Param("filterValue") String filterValue,
                                                        Pageable pageable);

    Optional<ChangeRecommendedMembers> findByChangeRecommendedMemberId(Long changeRecommendedMemberId);
}
