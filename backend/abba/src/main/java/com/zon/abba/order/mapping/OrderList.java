package com.zon.abba.order.mapping;

import java.time.LocalDateTime;

public interface OrderList {
    String getOrderDetailId();
    String getMemberName();
    String getProductName();
    LocalDateTime getCreatedDateTime();
    Integer getStatus();
}
