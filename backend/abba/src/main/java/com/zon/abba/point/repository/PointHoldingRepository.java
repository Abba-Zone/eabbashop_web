package com.zon.abba.point.repository;

import com.zon.abba.point.entity.PointHolding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PointHoldingRepository extends JpaRepository<PointHolding, String> {

    @Query(value = """
        SELECT * 
        FROM PointHolding 
        WHERE OrderDetailID = :orderDetailId
          AND DeleteYN = 'N'
          AND Status = 'A'
          AND (Type = 'A' or Type = 'B')
        """, nativeQuery = true)
    List<PointHolding> findByOrderDetailId(@Param("orderDetailId") String orderDetailId);
}
