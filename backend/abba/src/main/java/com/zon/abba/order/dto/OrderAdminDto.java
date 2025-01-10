package com.zon.abba.order.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.order.mapping.OrderList;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderAdminDto {
    @JsonProperty("orderDetailID")
    private String orderDetailID;
    @JsonProperty("memberName")
    private String memberName;
    @JsonProperty("productName")
    private String productName;
    @JsonProperty("createdDateTime")
    private LocalDateTime createdDateTime;
    @JsonProperty("status")
    private Integer status;

    public OrderAdminDto(OrderList orderList){
        this.orderDetailID = orderList.getOrderDetailId();
        this.memberName = orderList.getMemberName();
        this.productName = orderList.getProductName();
        this.createdDateTime = orderList.getCreatedDateTime();
        this.status = orderList.getStatus();
    }
}
