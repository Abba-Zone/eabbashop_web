package com.zon.abba.shipment.mapping;

import java.time.LocalDateTime;

public interface ShipmentList {
    String getShipmentId();
    String getInvoiceNo();
    String getName();
    LocalDateTime getScheduledTime();
    LocalDateTime getCreatedDateTime();
}
