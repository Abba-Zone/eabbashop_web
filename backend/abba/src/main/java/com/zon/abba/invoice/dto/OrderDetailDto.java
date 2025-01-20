package com.zon.abba.invoice.dto;

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
public class OrderDetailDto {
    @JsonProperty("status")
    private Integer status;
    @JsonProperty("createdDateTime")
    private LocalDateTime createdDateTime;

    public OrderDetailDto(OrderDetail orderDetail){
        this.status = orderDetail.getStatus();
        this.createdDateTime = orderDetail.getCreatedDateTime();
    }
}
