package com.zon.abba.order.dto;

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
    private String orderId;
    private LocalDateTime createdDateTime;
    private List<OrderDetailDto> orderDetails;
}
