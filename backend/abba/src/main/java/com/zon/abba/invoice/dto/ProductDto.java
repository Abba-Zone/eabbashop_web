package com.zon.abba.invoice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.order.entity.OrderDetail;
import com.zon.abba.order.mapping.OrderedProduct;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    @JsonProperty("thumbnail")
    private String thumbnail;
    @JsonProperty("productName")
    private String productName;
    @JsonProperty("LPPrice")
    private BigDecimal LPPrice;
    @JsonProperty("AKPrice")
    private BigDecimal AKPrice;
    @JsonProperty("SPPrice")
    private BigDecimal SPPrice;
    @JsonProperty("allowNation")
    private String allowNation;
    @JsonProperty("viewSite")
    private String viewSite;
    @JsonProperty("status")
    private Integer status;


    public ProductDto(OrderedProduct orderedProduct){
        this.thumbnail = orderedProduct.getThumbnail();
        this.productName = orderedProduct.getName();
        this.LPPrice = orderedProduct.getLP();
        this.AKPrice = new BigDecimal("0.0");
        this.SPPrice = orderedProduct.getSP();
        this.allowNation = orderedProduct.getAllowNation();
        this.viewSite = orderedProduct.getViewSite();
        this.status = orderedProduct.getStatus();

    }
}
