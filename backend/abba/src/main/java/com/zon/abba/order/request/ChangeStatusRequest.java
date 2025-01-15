package com.zon.abba.order.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChangeStatusRequest {
    @JsonProperty("orderDetailID")
    private String orderDetailID;
    @JsonProperty("status")
    private Integer status;
}
