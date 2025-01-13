package com.zon.abba.order.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductInfoDto {
    @JsonProperty("thumbnail")
    private String thumbnail;
    @JsonProperty("productName")
    private String productName;
    @JsonProperty("taxFreePrice")
    private BigDecimal taxFreePrice;
    @JsonProperty("SPPrice")
    private BigDecimal SPPrice;
    @JsonProperty("realPrice")
    private BigDecimal realPrice;
    @JsonProperty("allowNation")
    private String allowNation;
    @JsonProperty("viewSite")
    private String viewSite;

    public ProductInfoDto(Product product){
        this.thumbnail = product.getThumbnail();
        this.productName = product.getName();
        this.taxFreePrice = product.getTaxFreePrice();
        this.SPPrice = product.getSpPrice();
        this.realPrice = product.getRealPrice();
        this.allowNation = product.getAllowNation();
        this.viewSite = product.getViewSite();
    }
}
