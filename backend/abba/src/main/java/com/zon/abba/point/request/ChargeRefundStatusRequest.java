package com.zon.abba.point.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChargeRefundStatusRequest {
    @JsonProperty("chargeRefundID")
    private String chargeRefundID;
    @JsonProperty("status")
    private String status;
}
