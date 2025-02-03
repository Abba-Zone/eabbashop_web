package com.zon.abba.account.repository;

import com.zon.abba.account.entity.PointHolding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PointHoldingRepository extends JpaRepository<PointHolding, String> {
}
