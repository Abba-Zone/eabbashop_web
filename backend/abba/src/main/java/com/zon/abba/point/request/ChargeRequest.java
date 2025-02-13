package com.zon.abba.point.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChargeRequest {
    @JsonProperty("pointType")
    private String pointType;
    @JsonProperty("amount")
    private BigDecimal amount;
    @JsonProperty("code")
    private String code;
    @JsonProperty("parentID")
    private String parentID;
}
