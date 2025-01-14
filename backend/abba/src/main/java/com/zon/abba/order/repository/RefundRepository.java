package com.zon.abba.order.repository;

import com.zon.abba.order.entity.Refund;
import com.zon.abba.order.mapping.RefundOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RefundRepository extends JpaRepository<Refund, String> {
    @Query(value = "SELECT " +
            "r.RefundID AS refundId, " +
            "CONCAT(o.LastName, ' ', o.FirstName) AS name, " +
            "o.Phone AS phone, " +
            "r.OrderDetailID AS orderDetailID, " +
            "r.CreatedDateTime AS createdDateTime, " +
            "r.Status AS status " +
            "FROM Refund r " +
            "JOIN OrderDetail od ON r.OrderDetailID = od.OrderDetailID " +
            "JOIN Orders o ON od.OrderID = o.OrderID " +
            "WHERE r.DeleteYN = 'N' " +
            "AND r.SellerID = :sellerId " +
            "ORDER BY r.CreatedDateTime DESC",
            countQuery = "SELECT COUNT(*) " +
                    "FROM Refund r " +
                    "JOIN OrderDetail od ON r.OrderDetailID = od.OrderDetailID " +
                    "JOIN Orders o ON od.OrderID = o.OrderID " +
                    "WHERE r.DeleteYN = 'N' " +
                    "AND r.SellerID = :sellerId",
            nativeQuery = true)
    Page<RefundOrder> findRefundOrdersBySellerId(@Param("sellerId") String sellerId, Pageable pageable);
}
