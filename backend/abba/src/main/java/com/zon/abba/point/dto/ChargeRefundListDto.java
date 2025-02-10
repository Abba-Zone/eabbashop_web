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
    @JsonProperty("firstName")
    private String firstName;
    @JsonProperty("lastName")
    private String lastName;
    @JsonProperty("email")
    private String email;


    public ChargeRefundListDto(ChargeRefundList chargeRefundList, boolean isAdmin){
        this.chargeRefundID = chargeRefundList.getChargeRefundId();
        this.senderWalletID = chargeRefundList.getSenderWalletId();
        this.receiverWalletID = chargeRefundList.getReceiverWalletId();
        this.accountID = chargeRefundList.getAccountId();
        this.amount = chargeRefundList.getAmount();
        this.point = chargeRefundList.getPoint();
        this.type = chargeRefundList.getType();
        this.status = chargeRefundList.getStatus();
        this.createdDateTime = chargeRefundList.getCreatedDateTime();

        if(!isAdmin){
            if (this.status.equals("A") ||
                    this.status.equals("C") ||
                    this.status.equals("E") ||
                    this.status.equals("G")){
                this.firstName = chargeRefundList.getSenderFirstName();
                this.lastName = chargeRefundList.getSenderLastName();
                this.email = chargeRefundList.getSenderEmail();
            }else{
                this.firstName = chargeRefundList.getReceiverFirstName();
                this.lastName = chargeRefundList.getReceiverLastName();
                this.email = chargeRefundList.getReceiverEmail();
            }
        }else{
            if (this.status.equals("A") ||
                    this.status.equals("C") ||
                    this.status.equals("E") ||
                    this.status.equals("G")){
                this.firstName = chargeRefundList.getReceiverFirstName();
                this.lastName = chargeRefundList.getReceiverLastName();
                this.email = chargeRefundList.getReceiverEmail();
            }else{
                this.firstName = chargeRefundList.getSenderFirstName();
                this.lastName = chargeRefundList.getSenderLastName();
                this.email = chargeRefundList.getSenderEmail();
            }
        }

    }
}
