package com.zon.abba.order.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRefundDto {
    @JsonProperty("orderDetailID")
    private String orderDetailID;
    @JsonProperty("quantity")
    private Integer quantity;
}
