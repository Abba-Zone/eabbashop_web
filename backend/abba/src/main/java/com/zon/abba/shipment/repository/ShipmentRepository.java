package com.zon.abba.shipment.repository;

import com.zon.abba.shipment.entity.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShipmentRepository extends JpaRepository<String, Shipment> {
}
