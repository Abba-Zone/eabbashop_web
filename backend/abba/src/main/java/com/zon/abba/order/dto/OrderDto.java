package com.zon.abba.order.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderDto {
    @JsonProperty("orderID")
    private String orderId;
    @JsonProperty("createdDateTime")
    private LocalDateTime createdDateTime;
    @JsonProperty("orderDetails")
    private List<OrderDetailDto> orderDetails;
}
