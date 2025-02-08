package com.zon.abba.point.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChargeRequest {
    @JsonProperty("pointType")
    private String pointType;
    @JsonProperty("amount")
    private Integer amount;
    @JsonProperty("status")
    private String status;
    @JsonProperty("accountID")
    private String accountID;
}
