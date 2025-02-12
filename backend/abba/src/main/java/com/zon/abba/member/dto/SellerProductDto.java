package com.zon.abba.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.product.mapping.ProductList;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SellerProductDto {
    @JsonProperty("productID")
    private String productID;
    @JsonProperty("sellerID")
    private String sellerID;
    @JsonProperty("name")
    private String name;
    @JsonProperty("stock")
    private Integer stock;
    @JsonProperty("showYN")
    private Boolean showYN;

    public SellerProductDto(ProductList productList){
        this.productID = productList.getProductId();
        this.sellerID = productList.getSellerId();
        this.name = productList.getName();
        this.stock = productList.getStock();
        this.showYN = productList.getShowYN().equals("Y");
    }
}
