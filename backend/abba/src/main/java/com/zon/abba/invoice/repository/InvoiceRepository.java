package com.zon.abba.invoice.repository;

import com.zon.abba.invoice.entity.Invoice;
import com.zon.abba.invoice.mapping.InvoiceList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, String> {
    @Query(value = "SELECT " +
            "i.InvoiceID AS invoiceId, " +
            "SUBSTRING_INDEX(i.OrderDetailID, ',', 1) AS orderDetailId, " +
            "o.OrderID AS orderId, " +
            "i.InvoiceNo AS invoiceNo, " +
            "(SELECT CONCAT(m.LastName, ' ', m.FirstName) " +
            " FROM Members m " +
            " WHERE m.MemberID = o.MemberID) AS recipientName, " +
            "i.Status AS status, " +
            "i.CreatedDateTime AS createdDateTime " +
            "FROM Invoice i " +
            "LEFT JOIN OrderDetail od ON od.OrderDetailID = SUBSTRING_INDEX(i.OrderDetailID, ',', 1) " +
            "LEFT JOIN Orders o ON o.OrderID = od.OrderID " +
            "WHERE i.DeleteYN = 'N' " +
            "AND (:filter IS NULL OR " +
            "     (:filter = 'invoiceId' AND i.InvoiceID LIKE %:filterValue%) OR " +
            "     (:filter = 'orderId' AND o.OrderID LIKE %:filterValue%) OR " +
            "     (:filter = 'invoiceNo' AND i.InvoiceNo LIKE %:filterValue%) OR " +
            "     (:filter = 'recipientName' AND (SELECT CONCAT(m.LastName, ' ', m.FirstName) " +
            "                                    FROM Members m " +
            "                                    WHERE m.MemberID = o.MemberID) LIKE %:filterValue%) OR " +
            "     (:filter = 'status' AND i.Status = :filterValue) OR " +
            "     (:filter = 'createdDateTime' AND DATE(i.CreatedDateTime) = :filterValue))",
            countQuery = "SELECT COUNT(*) " +
                    "FROM Invoice i " +
                    "LEFT JOIN OrderDetail od ON od.OrderDetailID = SUBSTRING_INDEX(i.OrderDetailID, ',', 1) " +
                    "LEFT JOIN Orders o ON o.OrderID = od.OrderID " +
                    "WHERE i.DeleteYN = 'N' " +
                    "AND (:filter IS NULL OR " +
                    "     (:filter = 'invoiceId' AND i.InvoiceID LIKE %:filterValue%) OR " +
                    "     (:filter = 'orderId' AND o.OrderID LIKE %:filterValue%) OR " +
                    "     (:filter = 'invoiceNo' AND i.InvoiceNo LIKE %:filterValue%) OR " +
                    "     (:filter = 'recipientName' AND (SELECT CONCAT(m.LastName, ' ', m.FirstName) " +
                    "                                    FROM Members m " +
                    "                                    WHERE m.MemberID = o.MemberID) LIKE %:filterValue%) OR " +
                    "     (:filter = 'status' AND i.Status = :filterValue) OR " +
                    "     (:filter = 'createdDateTime' AND DATE(i.CreatedDateTime) = :filterValue))",
            nativeQuery = true)
    Page<InvoiceList> findFilteredInvoices(@Param("filter") String filter,
                                           @Param("filterValue") String filterValue,
                                           Pageable pageable);
}
