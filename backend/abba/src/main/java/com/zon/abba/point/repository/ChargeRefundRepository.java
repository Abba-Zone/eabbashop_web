package com.zon.abba.point.repository;

import com.zon.abba.point.entity.ChargeRefund;
import com.zon.abba.point.mapping.ChargeRefundList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ChargeRefundRepository extends JpaRepository<ChargeRefund, String> {

    @Query(value = """
    SELECT 
        c.ChargeRefundID AS chargeRefundId,
        c.SenderWalletID AS senderWalletId,
        c.ReceiverWalletID AS receiverWalletId,
        c.AccountID AS accountId,
        c.Amount AS amount,
        c.Point AS point,
        c.Type AS type,
        c.Status AS status,
        c.CreatedDateTime AS createdDateTime,
        c.ModifiedDateTime AS modifiedDateTime,
        
        -- Sender 정보
        s_m.FirstName AS senderFirstName,
        s_m.LastName AS senderLastName,
        s_m.Email AS senderEmail,

        -- Receiver 정보
        r_m.FirstName AS receiverFirstName,
        r_m.LastName AS receiverLastName,
        r_m.Email AS receiverEmail
        
    FROM ChargeRefund c
    LEFT JOIN Wallet s_w ON c.SenderWalletID = s_w.WalletID
    LEFT JOIN Members s_m ON s_w.MemberID = s_m.MemberID

    LEFT JOIN Wallet r_w ON c.ReceiverWalletID = r_w.WalletID
    LEFT JOIN Members r_m ON r_w.MemberID = r_m.MemberID
    
    WHERE c.DeleteYN = 'N'
    AND (c.SenderWalletID = :walletId OR c.ReceiverWalletID = :walletId)
    AND (:filter IS NULL 
        OR (:filter = 'status' AND c.Status = :filterValue) 
        OR (:filter = 'type' AND c.Type = :filterValue))
    """,
            countQuery = """
    SELECT COUNT(*)
    FROM ChargeRefund c
    LEFT JOIN Wallet s_w ON c.SenderWalletID = s_w.WalletID
    LEFT JOIN Members s_m ON s_w.MemberID = s_m.MemberID
    LEFT JOIN Wallet r_w ON c.ReceiverWalletID = r_w.WalletID
    LEFT JOIN Members r_m ON r_w.MemberID = r_m.MemberID
    WHERE c.DeleteYN = 'N'
    AND (c.SenderWalletID = :walletId OR c.ReceiverWalletID = :walletId)
    AND (:filter IS NULL 
        OR (:filter = 'status' AND c.Status = :filterValue) 
        OR (:filter = 'type' AND c.Type = :filterValue))
    """,
            nativeQuery = true
    )
    Page<ChargeRefundList> findByFilter(@Param("filter") String filter,
                                        @Param("filterValue") String filterValue,
                                        @Param("walletId") String walletId,
                                        Pageable pageable);
}
