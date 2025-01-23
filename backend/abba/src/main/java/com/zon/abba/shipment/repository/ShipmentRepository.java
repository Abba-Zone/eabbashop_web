package com.zon.abba.shipment.repository;

import com.zon.abba.shipment.entity.Shipment;
import com.zon.abba.shipment.mapping.ShipmentList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, String> {
    @Query(value = "SELECT " +
            "s.ShipmentID AS shipmentId, " +
            "i.InvoiceNo AS invoiceNo, " +
            "CONCAT(m.LastName, ' ', m.FirstName) AS name, " +
            "s.ScheduledTime AS scheduledTime, " +
            "s.CreatedDateTime AS createdDateTime " +
            "FROM Shipment s " +
            "JOIN Invoice i ON s.InvoiceID = i.InvoiceID " +
            "JOIN Members m ON s.MemberID = m.MemberID " +
            "WHERE s.DeleteYN = 'N' " +
            "AND (:filter IS NULL OR " +
            "     (:filter = 'name' AND CONCAT(m.LastName, ' ', m.FirstName) LIKE %:filterValue%) OR " +
            "     (:filter = 'invoiceNo' AND i.InvoiceNo LIKE %:filterValue%) OR " +
            "     (:filter = 'scheduledTime' AND DATE_FORMAT(s.ScheduledTime, '%Y-%m-%d') LIKE %:filterValue%) OR " +
            "     (:filter = 'createdDateTime' AND DATE_FORMAT(s.CreatedDateTime, '%Y-%m-%d') LIKE %:filterValue%))",
            countQuery = "SELECT COUNT(*) " +
                    "FROM Shipment s " +
                    "JOIN Invoice i ON s.InvoiceID = i.InvoiceID " +
                    "JOIN Members m ON s.MemberID = m.MemberID " +
                    "WHERE s.DeleteYN = 'N' " +
                    "AND (:filter IS NULL OR " +
                    "     (:filter = 'name' AND CONCAT(m.LastName, ' ', m.FirstName) LIKE %:filterValue%) OR " +
                    "     (:filter = 'invoiceNo' AND i.InvoiceNo LIKE %:filterValue%) OR " +
                    "     (:filter = 'scheduledTime' AND DATE_FORMAT(s.ScheduledTime, '%Y-%m-%d') LIKE %:filterValue%) OR " +
                    "     (:filter = 'createdDateTime' AND DATE_FORMAT(s.CreatedDateTime, '%Y-%m-%d') LIKE %:filterValue%))",
            nativeQuery = true)
    Page<ShipmentList> findShipmentList(
            @Param("filter") String filter,
            @Param("filterValue") String filterValue,
            Pageable pageable
    );
}
