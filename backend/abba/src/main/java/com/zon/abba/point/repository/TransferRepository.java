package com.zon.abba.point.repository;

import com.zon.abba.point.entity.Transfer;
import com.zon.abba.point.mapping.TransferList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TransferRepository extends JpaRepository<Transfer, String> {

    @Query(value = """
        SELECT 
            t.TransferID AS transferId,
            s_m.FirstName AS senderFirstName,
            s_m.LastName AS senderLastName,
            r_m.FirstName AS receiverFirstName,
            r_m.LastName AS receiverLastName,
            t.LP AS lp,
            t.AK AS ak,
            t.SP AS sp,
            t.Status AS status,
            t.ModifiedDateTime AS modifiedDateTime
        FROM Transfer t
        LEFT JOIN Members s_m ON t.SenderID = s_m.MemberID AND s_m.DeleteYN = 'N'
        LEFT JOIN Members r_m ON t.ReceiverID = r_m.MemberID AND r_m.DeleteYN = 'N'
        WHERE t.DeleteYN = 'N'
        AND t.Status = :status
        AND (
            :filter IS NULL OR
            (:filter = 'senderName' AND CONCAT(s_m.FirstName, ' ', s_m.LastName) LIKE %:filterValue%) OR
            (:filter = 'receiverName' AND CONCAT(r_m.FirstName, ' ', r_m.LastName) LIKE %:filterValue%)
        )
        ORDER BY t.ModifiedDateTime DESC
        """,
            countQuery = """
        SELECT COUNT(*) 
        FROM Transfer t
        LEFT JOIN Members s_m ON t.SenderID = s_m.MemberID
        LEFT JOIN Members r_m ON t.ReceiverID = r_m.MemberID
        WHERE t.DeleteYN = 'N'
        AND t.Status = :status
        AND (
            :filter IS NULL OR
            (:filter = 'senderName' AND CONCAT(s_m.FirstName, ' ', s_m.LastName) LIKE %:filterValue%) OR
            (:filter = 'receiverName' AND CONCAT(r_m.FirstName, ' ', r_m.LastName) LIKE %:filterValue%)
        )
        """,
            nativeQuery = true)
    Page<TransferList> findByFilterAndStatus(
            @Param("filter") String filter,
            @Param("filterValue") String filterValue,
            @Param("status") String status,
            Pageable pageable);
}
