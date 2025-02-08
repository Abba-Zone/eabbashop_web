package com.zon.abba.point.repository;

import com.zon.abba.point.entity.ChargeRefund;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChargeRefundRepository extends JpaRepository<ChargeRefund, String> {
}
