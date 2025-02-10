package com.zon.abba.point.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.point.mapping.ChargeRefundList;
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
public class ChargeRefundListDto {
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


    public ChargeRefundListDto(ChargeRefundList chargeRefundList){
        this.chargeRefundID = chargeRefundList.getChargeRefundId();
        this.senderWalletID = chargeRefundList.getSenderWalletId();
        this.receiverWalletID = chargeRefundList.getReceiverWalletId();
        this.accountID = chargeRefundList.getAccountId();
        this.amount = chargeRefundList.getAmount();
        this.point = chargeRefundList.getPoint();
        this.type = chargeRefundList.getType();
        this.status = chargeRefundList.getStatus();
        this.createdDateTime = chargeRefundList.getCreatedDateTime();
        this.senderFirstName = chargeRefundList.getSenderFirstName();
        this.senderLastName = chargeRefundList.getSenderLastName();
        this.senderEmail = chargeRefundList.getSenderEmail();
        this.receiverFirstName = chargeRefundList.getReceiverFirstName();
        this.receiverLastName = chargeRefundList.getReceiverLastName();
        this.receiverEmail = chargeRefundList.getReceiverEmail();
    }
}
