package com.zon.abba.order.mapping;

import java.time.LocalDateTime;

public interface RefundOrder {
    String getRefundId();
    String getName();
    String getPhone();
    String getOrderDetailID();
    LocalDateTime getCreatedDateTime();
    String getStatus();
}
