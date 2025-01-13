package com.zon.abba.order.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.order.entity.OrderDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderInfoDto {
    @JsonProperty("productName")
    private String productName;
    @JsonProperty("quantity")
    private Integer quantity;
    @JsonProperty("status")
    private Integer status;
    @JsonProperty("createdDateTime")
    private LocalDateTime createdDateTime;

    public OrderInfoDto(OrderDetail orderDetail, String productName){
        this.productName = productName;
        this.quantity = orderDetail.getQuantity();
        this.status = orderDetail.getStatus();
        this.createdDateTime = orderDetail.getCreatedDateTime();
    }
}
