package com.zon.abba.order.mapping;

import java.time.LocalDateTime;

public interface RefundOrder {
    String getRefundId();
    String getFirstName();
    String getLastName();
    String getPhone();
    String getOrderDetailID();
    LocalDateTime getCreatedDateTime();
    Integer getStatus();
}
