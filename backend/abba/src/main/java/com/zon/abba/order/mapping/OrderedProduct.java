package com.zon.abba.order.mapping;

import java.math.BigDecimal;

public interface OrderedProduct {
    String getOrderDetailId();
    String getProductId();
    String getName();
    String getAllowNation();
    String getViewSite();
    Integer getQuantity();
    Integer getStatus();
    String getThumbnail();
    BigDecimal getRealPrice();
    BigDecimal getLP();
    BigDecimal getSP();

}
