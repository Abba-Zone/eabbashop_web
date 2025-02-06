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
            "m.LastName AS lastName, " +
            "m.FirstName AS firstName, " +
            "o.Phone AS phone, " +
            "r.OrderDetailID AS orderDetailID, " +
            "r.CreatedDateTime AS createdDateTime, " +
            "r.Status AS status " +
            "FROM Refund r " +
            "JOIN OrderDetail od ON r.OrderDetailID = od.OrderDetailID " +
            "JOIN Orders o ON od.OrderID = o.OrderID " +
            "JOIN Members m ON o.MemberID = m.MemberID " +
            "WHERE r.DeleteYN = 'N' " +
            "AND r.SellerID = :sellerId " +
            "AND (:filter IS NULL " +
            "    OR (:filter = 'refundID' AND r.RefundID LIKE CONCAT('%', :filterValue, '%')) " +
            "    OR (:filter = 'name' AND CONCAT(m.LastName, ' ', m.FirstName) LIKE CONCAT('%', :filterValue, '%')) " +
            "    OR (:filter = 'phone' AND m.Phone LIKE CONCAT('%', :filterValue, '%')) " +
            "    OR (:filter = 'status' AND r.Status LIKE CONCAT('%', :filterValue, '%')) " +
            "    OR (:filter = 'orderDetailID' AND r.OrderDetailID LIKE CONCAT('%', :filterValue, '%')) " +
            "    OR (:filter = 'createdDateTime' AND DATE(r.CreatedDateTime) = STR_TO_DATE(:filterValue, '%Y-%m-%d')) " +
            ") " +
            "ORDER BY r.CreatedDateTime DESC",

            countQuery = "SELECT COUNT(*) " +
                    "FROM Refund r " +
                    "JOIN OrderDetail od ON r.OrderDetailID = od.OrderDetailID " +
                    "JOIN Orders o ON od.OrderID = o.OrderID " +
                    "JOIN Members m ON o.MemberID = m.MemberID " +
                    "WHERE r.DeleteYN = 'N' " +
                    "AND r.SellerID = :sellerId " +
                    "AND (:filter IS NULL " +
                    "    OR (:filter = 'refundID' AND r.RefundID LIKE CONCAT('%', :filterValue, '%')) " +
                    "    OR (:filter = 'name' AND CONCAT(m.LastName, ' ', m.FirstName) LIKE CONCAT('%', :filterValue, '%')) " +
                    "    OR (:filter = 'phone' AND m.Phone LIKE CONCAT('%', :filterValue, '%')) " +
                    "    OR (:filter = 'status' AND r.Status LIKE CONCAT('%', :filterValue, '%')) " +
                    "    OR (:filter = 'orderDetailID' AND r.OrderDetailID LIKE CONCAT('%', :filterValue, '%')) " +
                    "    OR (:filter = 'createdDateTime' AND DATE(r.CreatedDateTime) = STR_TO_DATE(:filterValue, '%Y-%m-%d')) " +
                    ")",
            nativeQuery = true)
    Page<RefundOrder> findRefundOrdersBySellerId(
            @Param("sellerId") String sellerId,
            @Param("filter") String filter,
            @Param("filterValue") String filterValue,
            Pageable pageable);
}
