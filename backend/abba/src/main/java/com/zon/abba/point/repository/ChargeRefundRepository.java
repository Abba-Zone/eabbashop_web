package com.zon.abba.point.repository;

import com.zon.abba.point.entity.ChargeRefund;
import com.zon.abba.point.mapping.ChargeRefundInfo;
import com.zon.abba.point.mapping.ChargeRefundList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

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
        OR (:filter = 'status' AND c.Status IN (:filterValues)) 
        OR (:filter = 'type' AND c.Type = :filterValue)
        OR (:filter = 'createdDateTime' AND DATE(c.CreatedDateTime) BETWEEN STR_TO_DATE(:filterValue, '%Y-%m-%d') AND CURRENT_DATE())
        )
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
        OR (:filter = 'status' AND c.Status IN (:filterValues)) 
        OR (:filter = 'type' AND c.Type = :filterValue)
        OR (:filter = 'createdDateTime' AND DATE(c.CreatedDateTime) BETWEEN STR_TO_DATE(:filterValue, '%Y-%m-%d') AND CURRENT_DATE())
        )
    """,
            nativeQuery = true)
    Page<ChargeRefundList> findByFilter(
            @Param("filter") String filter,
            @Param("filterValues") List<String> filterValues,
            @Param("filterValue") String filterValue,
            @Param("walletId") String walletId,
            Pageable pageable);

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
        r_m.Email AS receiverEmail,
        
        COALESCE(a.Bank, '') AS bank,
        COALESCE(a.AccountNumber, '') AS accountNumber,
        COALESCE(a.FirstName, '') AS accountFirstName,
        COALESCE(a.LastName, '') AS accountLastName
        
    FROM ChargeRefund c
    LEFT JOIN Wallet s_w ON c.SenderWalletID = s_w.WalletID
    LEFT JOIN Members s_m ON s_w.MemberID = s_m.MemberID

    LEFT JOIN Wallet r_w ON c.ReceiverWalletID = r_w.WalletID
    LEFT JOIN Members r_m ON r_w.MemberID = r_m.MemberID
    
    LEFT JOIN Accounts a ON c.AccountID IS NOT NULL AND c.AccountID = a.AccountID 
    
    WHERE c.DeleteYN = 'N'
    AND c.ChargeRefundID = :chargeRefundId
    """, nativeQuery = true)
    Optional<ChargeRefundInfo> findInfoByChargeRefundId(@Param("chargeRefundId") String chargeRefundId);
}
