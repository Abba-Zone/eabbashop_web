package com.zon.abba.order.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.order.entity.OrderDetail;
import com.zon.abba.order.mapping.OrderedProduct;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetailDto {
    @JsonProperty("orderDetailID")
    private String orderDetailId;
    @JsonProperty("productID")
    private String productId;
    @JsonProperty("name")
    private String name;
    @JsonProperty("allowNation")
    private String allowNation;
    @JsonProperty("viewSite")
    private String viewSite;
    @JsonProperty("quantity")
    private Integer quantity;
    @JsonProperty("status")
    private Integer status;
    @JsonProperty("thumbnail")
    private String thumbnail;
    @JsonProperty("LP")
    private BigDecimal LP;
    @JsonProperty("AK")
    private BigDecimal AK;
    @JsonProperty("SP")
    private BigDecimal SP;

    public OrderDetailDto(OrderedProduct orderedProduct){
        this.orderDetailId = orderedProduct.getOrderDetailId();
        this.productId = orderedProduct.getProductId();
        this.name = orderedProduct.getName();
        this.allowNation = orderedProduct.getAllowNation();
        this.viewSite = orderedProduct.getViewSite();
        this.quantity = orderedProduct.getQuantity();
        this.status = orderedProduct.getStatus();
        this.thumbnail = orderedProduct.getThumbnail();
        this.LP = orderedProduct.getLP();
        this.AK = BigDecimal.valueOf(0.0);
        this.SP = orderedProduct.getSP();
    }
}
