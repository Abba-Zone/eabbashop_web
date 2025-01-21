package com.zon.abba.order.repository;

import com.zon.abba.order.entity.Orders;
import org.hibernate.query.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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

    @Query(value = "SELECT o.* " +
            "FROM Orders o " +
            "JOIN OrderDetail od ON o.OrderID = od.OrderID " +
            "WHERE od.OrderDetailID = :orderDetailID", nativeQuery = true)
    Optional<Orders> findOrderByOrderDetailID(@Param("orderDetailID") String orderDetailID);
}
