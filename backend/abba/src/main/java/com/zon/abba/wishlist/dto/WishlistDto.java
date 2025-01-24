package com.zon.abba.wishlist.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.wishlist.mapping.WishListList;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WishlistDto {
    @JsonProperty("wishlistID")
    private String wishlistID;
    @JsonProperty("productID")
    private String productID;
    @JsonProperty("name")
    private String name;
    @JsonProperty("thumbnail")
    private String thumbnail;
    @JsonProperty("realPrice")
    private BigDecimal realPrice;
    @JsonProperty("LP")
    private BigDecimal LP;
    @JsonProperty("AK")
    private BigDecimal AK;
    @JsonProperty("SP")
    private BigDecimal SP;

    public WishlistDto(WishListList wishListList){
        this.wishlistID = wishListList.getWishlistId();
        this.productID = wishListList.getProductId();
        this.name = wishListList.getName();
        this.thumbnail = wishListList.getThumbnail();
        this.realPrice = wishListList.getRealPrice();
        this.LP = wishListList.getLP();
        this.AK = wishListList.getAK();
        this.SP = wishListList.getSP();
    }

}