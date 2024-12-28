package com.zon.abba.account.repository;

import com.zon.abba.account.entity.PointsHistory;
import com.zon.abba.account.entity.Wallet;
import com.zon.abba.account.mapping.HistoryList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PointsHistoryRepository extends JpaRepository<PointsHistory, String> {
    @Query(value = "SELECT ph.HistoryID AS historyId, " +
            "       CONCAT(m1.LastName, ' ', m1.FirstName) AS sender, " +
            "       CONCAT(m2.LastName, ' ', m2.FirstName) AS receiver, " +
            "       ph.Message AS message, " +
            "       ph.LP AS LP, ph.AK AS AK, ph.ABZ AS ABZ, ph.ABZPoint AS ABZPoint, ph.SP AS SP, " +
            "       ph.Type AS type, " +
            "       ph.ModifiedDateTime AS modifiedDateTime" +
            "FROM ( " +
            "    SELECT HistoryID, SenderWalletID, ReceiverWalletID, Message, LP, AK, NULL AS ABZ, NULL AS ABZPoint, SP, Type, ModifiedDateTime " +
            "    FROM PointsHistory " +
            "    WHERE (SenderWalletID IN (SELECT WalletID FROM Wallet WHERE MemberID = :memberId) " +
            "           OR ReceiverWalletID IN (SELECT WalletID FROM Wallet WHERE MemberID = :memberId)) " +
            "          AND (:type IS NULL OR Type = :type) " +
            "    UNION ALL " +
            "    SELECT HistoryID, SenderWalletID, ReceiverWalletID, Message, NULL AS LP, NULL AS AK, ABZ, NULL AS ABZPoint, NULL AS SP, Type, ModifiedDateTime " +
            "    FROM ABZPointsHistory " +
            "    WHERE (SenderWalletID IN (SELECT WalletID FROM Wallet WHERE MemberID = :memberId) " +
            "           OR ReceiverWalletID IN (SELECT WalletID FROM Wallet WHERE MemberID = :memberId)) " +
            "          AND (:type IS NULL OR Type = :type) " +
            "    UNION ALL " +
            "    SELECT HistoryID, SenderWalletID, ReceiverWalletID, Message, NULL AS LP, NULL AS AK, NULL AS ABZ, ABZPoint, NULL AS SP, Type, ModifiedDateTime " +
            "    FROM ABZPointPointsHistory " +
            "    WHERE (SenderWalletID IN (SELECT WalletID FROM Wallet WHERE MemberID = :memberId) " +
            "           OR ReceiverWalletID IN (SELECT WalletID FROM Wallet WHERE MemberID = :memberId)) " +
            "          AND (:type IS NULL OR Type = :type) " +
            ") ph " +
            "LEFT JOIN Wallet w1 ON ph.SenderWalletID = w1.WalletID " +
            "LEFT JOIN Member m1 ON w1.MemberID = m1.MemberID " +
            "LEFT JOIN Wallet w2 ON ph.ReceiverWalletID = w2.WalletID " +
            "LEFT JOIN Member m2 ON w2.MemberID = m2.MemberID " +
            "ORDER BY ph.ModifiedDateTime DESC",
            countQuery = "SELECT COUNT(*) FROM ( " +
                    "    SELECT HistoryID FROM PointsHistory WHERE (SenderWalletID IN (SELECT WalletID FROM Wallet WHERE MemberID = :memberId) " +
                    "           OR ReceiverWalletID IN (SELECT WalletID FROM Wallet WHERE MemberID = :memberId)) AND (:type IS NULL OR Type = :type) " +
                    "    UNION ALL " +
                    "    SELECT HistoryID FROM ABZPointsHistory WHERE (SenderWalletID IN (SELECT WalletID FROM Wallet WHERE MemberID = :memberId) " +
                    "           OR ReceiverWalletID IN (SELECT WalletID FROM Wallet WHERE MemberID = :memberId)) AND (:type IS NULL OR Type = :type) " +
                    "    UNION ALL " +
                    "    SELECT HistoryID FROM ABZPointPointsHistory WHERE (SenderWalletID IN (SELECT WalletID FROM Wallet WHERE MemberID = :memberId) " +
                    "           OR ReceiverWalletID IN (SELECT WalletID FROM Wallet WHERE MemberID = :memberId)) AND (:type IS NULL OR Type = :type) " +
                    ") ph",
            nativeQuery = true)
    Page<HistoryList> findHistoryByWalletId(@Param("memberId") String memberId, @Param("type") String type, Pageable pageable);
}
