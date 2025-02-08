package com.zon.abba.point.repository;

import com.zon.abba.point.entity.ChargeRefund;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ChargeRefundRepository extends JpaRepository<ChargeRefund, String> {

    @Query(value = "SELECT * FROM ChargeRefund c " +
            "WHERE c.DeleteYN = 'N' " +
            "AND (c.SenderWalletID = :walletId OR c.ReceiverWalletID = :walletId) " +
            "AND (:filter IS NULL OR " +
            "    (:filter = 'status' AND c.Status = :filterValue) OR " +
            "    (:filter = 'type' AND c.Type = :filterValue))",
            countQuery = "SELECT COUNT(*) FROM ChargeRefund c " +
                    "WHERE c.DeleteYN = 'N' " +
                    "AND (c.SenderWalletID = :memberId OR c.ReceiverWalletID = :memberId) " +
                    "AND (:filter IS NULL OR " +
                    "    (:filter = 'status' AND c.Status = :filterValue) OR " +
                    "    (:filter = 'type' AND c.Type = :filterValue))",
            nativeQuery = true)
    Page<ChargeRefund> findByFilter(@Param("filter") String filter,
                                    @Param("filterValue") String filterValue,
                                    @Param("walletId") String walletId,
                                    Pageable pageable);
}
