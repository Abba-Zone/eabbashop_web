package com.zon.abba.point.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.point.entity.ChargeRefund;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChargeList {
    @JsonProperty("chargeRefundID")
    private String chargeRefundID;
    @JsonProperty("amount")
    private BigDecimal amount;
    @JsonProperty("point")
    private BigDecimal point;
    @JsonProperty("type")
    private String type;
    @JsonProperty("status")
    private String status;
    @JsonProperty("createdDateTime")
    private LocalDateTime createdDateTime;

    public ChargeList(ChargeRefund chargeRefund){
        this.chargeRefundID = chargeRefund.getChargeRefundId();
        this.amount = chargeRefund.getAmount();
        this.point = chargeRefund.getPoint();
        this.type = chargeRefund.getType();
        this.status = chargeRefund.getStatus();
        this.createdDateTime = chargeRefund.getCreatedDateTime();
    }
}
