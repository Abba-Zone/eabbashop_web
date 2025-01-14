package com.zon.abba.order.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.order.dto.RegisterRefundDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRefundRequest {
    @JsonProperty("orderDetails")
    private List<RegisterRefundDto> orderDetails;
    @JsonProperty("status")
    private Integer status;
}
