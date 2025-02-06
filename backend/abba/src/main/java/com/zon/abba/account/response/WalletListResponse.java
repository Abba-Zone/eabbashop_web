package com.zon.abba.account.response;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import software.amazon.ion.Decimal;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WalletListResponse {
    @JsonProperty("walletID")
    private String walletID;
    @JsonProperty("message")
    private String message;
    @JsonProperty("type")
    private String type;
    @JsonProperty("LP")
    private BigDecimal LP;
    @JsonProperty("AK")
    private BigDecimal AK;
    @JsonProperty("SP")
    private BigDecimal SP;
    @JsonProperty("pointType")
    private String pointType;
}
