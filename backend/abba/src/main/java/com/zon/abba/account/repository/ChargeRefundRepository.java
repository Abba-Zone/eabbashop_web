package com.zon.abba.account.repository;

import com.zon.abba.account.entity.ChargeRefund;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChargeRefundRepository extends JpaRepository<ChargeRefund, String> {
}
