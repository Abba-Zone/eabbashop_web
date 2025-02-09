package com.zon.abba.account.response;


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
public class WalletListDetailResponse {
    @JsonProperty("historyID")
    private String historyID;
    @JsonProperty("message")
    private String message;

    @JsonProperty("LP")
    private BigDecimal LP;
    @JsonProperty("LPBalance")
    private BigDecimal LPBalance;
    @JsonProperty("AK")
    private BigDecimal AK;
    @JsonProperty("AKBalance")
    private BigDecimal AKBalance;
    @JsonProperty("SP")
    private BigDecimal SP;
    @JsonProperty("SPBalance")
    private BigDecimal SPBalance;

    @JsonProperty("OrderDetailID")
    private String OrderDetailID;
    @JsonProperty("ChargeRefundID")
    private String ChargeRefundID;
    @JsonProperty("TransferID")
    private String TransferID;

    @JsonProperty("type")
    private String type;
    @JsonProperty("pointType")
    private String pointType;
}
