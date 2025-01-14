package com.zon.abba.product.dto;

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
public class ProductDto {

    @JsonProperty("productId")
    private String productId;

    @JsonProperty("categoryId")
    private String categoryId;

    @JsonProperty("categoryName")
    private String categoryName;

    @JsonProperty("sellerId")
    private String sellerId;

    @JsonProperty("productName")
    private String productName;

    @JsonProperty("taxFreePrice")
    private BigDecimal taxFreePrice;

    @JsonProperty("spPrice")
    private BigDecimal spPrice;

    @JsonProperty("realPrice")
    private BigDecimal realPrice;

    @JsonProperty("stock")
    private int stock;

    @JsonProperty("thumbnail")
    private String thumbnail;

    @JsonProperty("summary")
    private String summary;

    @JsonProperty("description")
    private String description;

    @JsonProperty("paybackRatio")
    private double paybackRatio;

    public ProductDto(Product product) {
        this.productId = product.getProductId();
        this.categoryId = product.getCategoryId();
        this.sellerId = product.getSellerId();
        this.productName = product.getName();
        this.taxFreePrice = product.getTaxFreePrice();
        this.spPrice = product.getSpPrice();
        this.realPrice = product.getRealPrice();
        this.stock = product.getStock();
        this.thumbnail = product.getThumbnail();
        this.summary = product.getSummary();
        this.description = product.getDescription();
        this.paybackRatio = product.getPaybackRatio();
    }
}
