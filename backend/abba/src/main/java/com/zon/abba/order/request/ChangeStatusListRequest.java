package com.zon.abba.order.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChangeStatusListRequest {
    @JsonProperty("orderDetailIDs")
    private List<OrderDetailIdRequest> orderDetailIDs;
    @JsonProperty("status")
    private Integer status;
}
