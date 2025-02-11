package com.zon.abba.point.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TransferRequest {
    @JsonProperty("receiverID")
    private String receiverID;
    @JsonProperty("LP")
    private BigDecimal LP;
    @JsonProperty("AK")
    private BigDecimal AK;
    @JsonProperty("SP")
    private BigDecimal SP;
    @JsonProperty("message")
    private String message;
}
