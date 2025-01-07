package com.zon.abba.cart.mapping;

import java.math.BigDecimal;

public interface CartList {
    String getCartId();
    String getProductId();
    String getThumbnail();
    String getName();
    Integer getStock();
    Integer getQuantity();
    BigDecimal getRealPrice();
    BigDecimal getSP();
    String getSelectYN();
}
