package com.zon.abba.order.repository;

import com.zon.abba.order.entity.Orders;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Orders, String> {
    // 페이징: memberId, deleteYN, year에 따른 Orders 가져오기
    @Query(value = "SELECT * FROM Orders " +
            "WHERE memberId = :memberId " +
            "AND deleteYN = :deleteYN " +
            "AND (:year IS NULL OR YEAR(createdDateTime) = :year)",
            countQuery = "SELECT COUNT(*) FROM Orders " +
                    "WHERE memberId = :memberId " +
                    "AND deleteYN = :deleteYN " +
                    "AND (:year IS NULL OR YEAR(createdDateTime) = :year)",
            nativeQuery = true)
    Page<Orders> findByMemberIdAndYearPaged(
            @Param("memberId") String memberId,
            @Param("deleteYN") String deleteYN,
            @Param("year") String year,
            Pageable pageable);
}
