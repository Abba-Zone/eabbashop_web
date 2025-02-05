package com.zon.abba.point.repository;

import com.zon.abba.member.entity.Seller;
import io.lettuce.core.dynamic.annotation.Param;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.zon.abba.point.entity.PointHolding;

@Repository
public interface PointHoldingRepository extends JpaRepository<PointHolding, String> {
    @Modifying
    @Transactional
    @Query("UPDATE PointHolding p SET p.status = :status WHERE p.holdingId = :holdingId")
    int updateStatusByHoldingId(@Param("holdingId") String holdingId, @Param("status") String status);
}
