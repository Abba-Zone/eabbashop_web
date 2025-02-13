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
    @JsonProperty("code")
    private String code;
    @JsonProperty("type")
    private String type;
    @JsonProperty("status")
    private String status;
    @JsonProperty("createdDateTime")
    private LocalDateTime createdDateTime;
    @JsonProperty("member")
    private MemberDto member;


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
                this.member = new MemberDto(
                        chargeRefundList.getSenderFirstName(),
                        chargeRefundList.getSenderLastName(),
                        chargeRefundList.getSenderEmail()
                        );
            }else{
                this.member = new MemberDto(
                        chargeRefundList.getReceiverFirstName(),
                        chargeRefundList.getReceiverLastName(),
                        chargeRefundList.getReceiverEmail()
                );
            }
        }else{
            if (this.status.equals("A") ||
                    this.status.equals("C") ||
                    this.status.equals("E") ||
                    this.status.equals("G")){
                this.member = new MemberDto(
                        chargeRefundList.getReceiverFirstName(),
                        chargeRefundList.getReceiverLastName(),
                        chargeRefundList.getReceiverEmail()
                );
            }else{
                this.member = new MemberDto(
                        chargeRefundList.getSenderFirstName(),
                        chargeRefundList.getSenderLastName(),
                        chargeRefundList.getSenderEmail()
                );
            }
        }

    }
}
