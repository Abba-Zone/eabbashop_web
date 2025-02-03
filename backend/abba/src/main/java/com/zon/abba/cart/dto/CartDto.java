package com.zon.abba.cart.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.cart.mapping.CartList;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartDto {
    @JsonProperty("cartID")
    private String cartId;
    @JsonProperty("productID")
    private String productId;
    @JsonProperty("thumbnail")
    private String thumbnail;
    @JsonProperty("name")
    private String name;
    @JsonProperty("stock")
    private Integer stock;
    @JsonProperty("quantity")
    private Integer quantity;
    @JsonProperty("realPrice")
    private BigDecimal realPrice;
    @JsonProperty("SP")
    private BigDecimal SP;
    @JsonProperty("AK")
    private BigDecimal AK;
    @JsonProperty("selectYN")
    private Boolean selectYN;

    public CartDto(CartList cartList){
        this.cartId = cartList.getCartId();
        this.productId = cartList.getProductId();
        this.thumbnail = cartList.getThumbnail();
        this.name = cartList.getName();
        this.stock = cartList.getStock();
        this.quantity = cartList.getQuantity();
        this.realPrice = cartList.getRealPrice();
        this.SP = cartList.getSP();
        this.AK = BigDecimal.valueOf(0.0);
        this.selectYN = cartList.getSelectYN().equals("Y");

    }

}
