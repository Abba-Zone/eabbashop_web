package com.zon.abba.cart.dto;

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
    private String cartId;
    private String productId;
    private String thumbnail;
    private String name;
    private Integer stock;
    private Integer quantity;
    private BigDecimal realPrice;
    private BigDecimal SP;
    private BigDecimal AK;
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
