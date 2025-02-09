package com.zon.abba.point.repository;

import com.zon.abba.account.response.WalletListDetailResponse;
import com.zon.abba.point.entity.PointsHistory;
import com.zon.abba.point.mapping.HistoryList;
import com.zon.abba.account.response.WalletListResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.time.LocalDateTime;

@Repository
public interface PointsHistoryRepository extends JpaRepository<PointsHistory, String> {

    @Query("SELECT new com.zon.abba.account.response.WalletListResponse( " +
    "ph.historyId, ph.message, ph.type, ph.lp, ph.ak, ph.sp, c.codeName) " +
    "FROM PointsHistory ph " +
    "JOIN CommonCode c ON c.code = ph.type  and c.codeGroup = 'PointsHistory'  " +
    "WHERE ph.memberId = :memberId and ph.createdDateTime between :startDate and :endDate " )
    Page<WalletListResponse> getWalletList(@Param("memberId") String memberId, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate, Pageable pageable);

    @Query("SELECT new com.zon.abba.account.response.WalletListDetailResponse( " +
    "ph.historyId, ph.message, ph.lp, ph.lpBalance, ph.ak, ph.akBalance, ph.sp, ph.spBalance," +
            " ph.orderDetailId, ph.chargeRefundId, ph.transferId, ph.transferId, c.codeName ) " +
    "from PointsHistory ph " +
            "inner join CommonCode c ON c.code = ph.type  and c.codeGroup = 'PointsHistory'   " +
    "WHERE ph.historyId = :historyId and ph.memberId = :memberId " )
    WalletListDetailResponse getWalletListDetail(@Param("memberId") String memberId, @Param("historyId") String historyId);

    @Query("SELECT new com.zon.abba.account.response.WalletListDetailResponse( " +
    "ph.historyId, ph.message, ph.lp, ph.lpBalance, ph.ak, ph.akBalance, ph.sp, ph.spBalance," +
            " ph.orderDetailId, ph.chargeRefundId, ph.transferId, ph.transferId, c.codeName ) " +
    "from PointsHistory ph " +
            "inner join CommonCode c ON c.code = ph.type  and c.codeGroup = 'PointsHistory'   " +
    "WHERE ph.historyId = :historyId  " )
    WalletListDetailResponse getWalletListDetailAdmin(@Param("historyId") String historyId);

    // 특정 회원의 거래 내역 조회 (JPQL)
    @Query("select ph.historyId, ph.message, c.codeName, ph.lp, ph.ak, ph.sp " +
            " from PointsHistory ph " +
            " inner join CommonCode c on c.code = ph.type and c.codeGroup = 'PointsHistory' " +
            " where ph.memberId = :memberId and ph.createdDateTime between :startDate and :endDate " +
            "   order by ph.createdDateTime desc")
    Page<WalletListResponse> getTotalLpByMemberId2(@Param("memberId") String memberId, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate, Pageable pageable);

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

    Optional<PointsHistory> findByOrderDetailId(String orderDetailId);
}
