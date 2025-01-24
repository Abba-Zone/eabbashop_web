package com.zon.abba.wishlist.mapping;

import java.math.BigDecimal;

public interface WishListList {
    String getWishlistId();
    String getProductId();
    String getName();
    String getThumbnail();
    BigDecimal getRealPrice();
    BigDecimal getLP();
    BigDecimal getAK();
    BigDecimal getSP();
}
