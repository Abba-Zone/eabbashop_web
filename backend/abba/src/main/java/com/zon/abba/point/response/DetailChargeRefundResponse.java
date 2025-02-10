package com.zon.abba.point.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.point.mapping.ChargeRefundInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DetailChargeRefundResponse {
    @JsonProperty("chargeRefundID")
    private String chargeRefundID;
    @JsonProperty("senderWalletID")
    private String senderWalletID;
    @JsonProperty("receiverWalletID")
    private String receiverWalletID;
    @JsonProperty("accountID")
    private String accountID;
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
    @JsonProperty("senderFirstName")
    private String senderFirstName;
    @JsonProperty("senderLastName")
    private String senderLastName;
    @JsonProperty("senderEmail")
    private String senderEmail;
    @JsonProperty("receiverFirstName")
    private String receiverFirstName;
    @JsonProperty("receiverLastName")
    private String receiverLastName;
    @JsonProperty("receiverEmail")
    private String receiverEmail;

    public DetailChargeRefundResponse(ChargeRefundInfo chargeRefundInfo){
        this.chargeRefundID = chargeRefundInfo.getChargeRefundId();
        this.senderWalletID = chargeRefundInfo.getSenderWalletId();
        this.receiverWalletID = chargeRefundInfo.getReceiverWalletId();
        this.accountID = chargeRefundInfo.getAccountId();
        this.amount = chargeRefundInfo.getAmount();
        this.point = chargeRefundInfo.getPoint();
        this.type = chargeRefundInfo.getType();
        this.status = chargeRefundInfo.getStatus();
        this.createdDateTime = chargeRefundInfo.getCreatedDateTime();
        this.senderFirstName = chargeRefundInfo.getSenderFirstName();
        this.senderLastName = chargeRefundInfo.getSenderLastName();
        this.senderEmail = chargeRefundInfo.getSenderEmail();
        this.receiverFirstName = chargeRefundInfo.getReceiverFirstName();
        this.receiverLastName = chargeRefundInfo.getReceiverLastName();
        this.receiverEmail = chargeRefundInfo.getReceiverEmail();
    }
}
