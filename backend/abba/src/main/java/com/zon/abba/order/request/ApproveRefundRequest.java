package com.zon.abba.order.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ApproveRefundRequest {
    @JsonProperty("refundID")
    private String refundID;
    @JsonProperty("status")
    private Integer status;
}
