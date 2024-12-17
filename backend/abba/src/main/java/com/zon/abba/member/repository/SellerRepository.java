package com.zon.abba.member.repository;

import com.zon.abba.member.entity.Seller;
import com.zon.abba.member.mapping.SellerList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SellerRepository extends JpaRepository<Seller, String> {
    Optional<Seller> findOneByMemberId(String memberId);

    @Query(value = "SELECT s.SellerID AS sellerId, " +
            "       s.Name AS name, " +
            "       CONCAT(m.LastName, ' ', m.FirstName) AS host, " +
            "       s.Phone AS phone, " +
            "       s.CreatedDateTime AS createdDateTime " +
            "FROM Seller s " +
            "LEFT JOIN Members m ON s.MemberID = m.MemberID " +
            "WHERE (:filter IS NULL OR " +
            "       CASE " +
            "           WHEN :filter = 'name' THEN s.Name LIKE CONCAT('%', :filterValue, '%') " +
            "           WHEN :filter = 'host' THEN CONCAT(m.LastName, ' ', m.FirstName) LIKE CONCAT('%', :filterValue, '%') " +
            "           WHEN :filter = 'phone' THEN s.Phone LIKE CONCAT('%', :filterValue, '%') " +
            "           WHEN :filter = 'createdDateTime' THEN DATE_FORMAT(s.CreatedDateTime, '%Y-%m-%d') = :filterValue " +
            "       END) ",
            countQuery = "SELECT COUNT(*) " +
                    "FROM Seller s " +
                    "LEFT JOIN Members m ON s.MemberID = m.MemberID " +
                    "WHERE (:filter IS NULL OR " +
                    "       CASE " +
                    "           WHEN :filter = 'name' THEN s.Name LIKE CONCAT('%', :filterValue, '%') " +
                    "           WHEN :filter = 'host' THEN CONCAT(m.LastName, ' ', m.FirstName) LIKE CONCAT('%', :filterValue, '%') " +
                    "           WHEN :filter = 'phone' THEN s.Phone LIKE CONCAT('%', :filterValue, '%') " +
                    "           WHEN :filter = 'createdDateTime' THEN DATE_FORMAT(s.CreatedDateTime, '%Y-%m-%d') = :filterValue " +
                    "       END) ",
            nativeQuery = true)
    Page<SellerList> findSellersWithFilter(
            @Param("filter") String filter,
            @Param("filterValue") String filterValue,
            Pageable pageable
    );
}
