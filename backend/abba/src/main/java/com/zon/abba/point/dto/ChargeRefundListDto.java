package com.zon.abba.point.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.point.mapping.ChargeRefundInfo;
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
    @JsonProperty("firstName")
    private String firstName;
    @JsonProperty("lastName")
    private String lastName;
    @JsonProperty("email")
    private String email;


    public ChargeRefundListDto(ChargeRefundInfo chargeRefundInfo, boolean isAdmin){
        this.chargeRefundID = chargeRefundInfo.getChargeRefundId();
        this.senderWalletID = chargeRefundInfo.getSenderWalletId();
        this.receiverWalletID = chargeRefundInfo.getReceiverWalletId();
        this.accountID = chargeRefundInfo.getAccountId();
        this.amount = chargeRefundInfo.getAmount();
        this.point = chargeRefundInfo.getPoint();
        this.type = chargeRefundInfo.getType();
        this.status = chargeRefundInfo.getStatus();
        this.createdDateTime = chargeRefundInfo.getCreatedDateTime();

        if(!isAdmin){
            if (this.status.equals("A") ||
                    this.status.equals("C") ||
                    this.status.equals("E") ||
                    this.status.equals("G")){
                this.firstName = chargeRefundInfo.getSenderFirstName();
                this.lastName = chargeRefundInfo.getSenderLastName();
                this.email = chargeRefundInfo.getSenderEmail();
            }else{
                this.firstName = chargeRefundInfo.getReceiverFirstName();
                this.lastName = chargeRefundInfo.getReceiverLastName();
                this.email = chargeRefundInfo.getReceiverEmail();
            }
        }else{
            if (this.status.equals("A") ||
                    this.status.equals("C") ||
                    this.status.equals("E") ||
                    this.status.equals("G")){
                this.firstName = chargeRefundInfo.getReceiverFirstName();
                this.lastName = chargeRefundInfo.getReceiverLastName();
                this.email = chargeRefundInfo.getReceiverEmail();
            }else{
                this.firstName = chargeRefundInfo.getSenderFirstName();
                this.lastName = chargeRefundInfo.getSenderLastName();
                this.email = chargeRefundInfo.getSenderEmail();
            }
        }

    }
}
