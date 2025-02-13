package com.zon.abba.product.response;

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
public class DetailProductResponse {
    @JsonProperty("productID")
    private String productId;

    @JsonProperty("categoryID")
    private String categoryId;

    @JsonProperty("categoryName")
    private String categoryName;

    @JsonProperty("sellerID")
    private String sellerId;

    @JsonProperty("realSellerID")
    private String realSellerId;

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

    @JsonProperty("isWishList")
    private boolean isWishList;

    public DetailProductResponse(Product product, String categoryName, String realSellerId) {
        this.productId = product.getProductId();
        this.categoryId = product.getCategoryId();
        this.categoryName = categoryName;
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
        this.isWishList = false;
        this.realSellerId = realSellerId;
    }

    public DetailProductResponse(Product product, String categoryName) {
        this.productId = product.getProductId();
        this.categoryId = product.getCategoryId();
        this.categoryName = categoryName;
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
        this.isWishList = false;
    }

    public DetailProductResponse(Product product, String categoryName, boolean isWishList) {
        this.productId = product.getProductId();
        this.categoryId = product.getCategoryId();
        this.categoryName = categoryName;
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
        this.isWishList = isWishList;
    }
    public DetailProductResponse(Product product, String categoryName, boolean isWishList, String realSellerId) {
        this.productId = product.getProductId();
        this.categoryId = product.getCategoryId();
        this.categoryName = categoryName;
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
        this.isWishList = isWishList;
        this.realSellerId = realSellerId;
    }
}
