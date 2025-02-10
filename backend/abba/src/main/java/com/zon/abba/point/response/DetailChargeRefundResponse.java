package com.zon.abba.point.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.point.dto.AccountDto;
import com.zon.abba.point.dto.MemberDto;
import com.zon.abba.point.mapping.ChargeRefundInfo;
import com.zon.abba.point.mapping.ChargeRefundList;
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
    @JsonProperty("sender")
    private MemberDto sender;
    @JsonProperty("receiver")
    private MemberDto receiver;
    @JsonProperty("account")
    private AccountDto account;

    public DetailChargeRefundResponse(ChargeRefundInfo chargeRefundInfo){
        this.chargeRefundID = chargeRefundInfo.getChargeRefundId();
        this.senderWalletID = chargeRefundInfo.getSenderWalletId();
        this.receiverWalletID = chargeRefundInfo.getReceiverWalletId();
        this.amount = chargeRefundInfo.getAmount();
        this.point = chargeRefundInfo.getPoint();
        this.type = chargeRefundInfo.getType();
        this.status = chargeRefundInfo.getStatus();
        this.createdDateTime = chargeRefundInfo.getCreatedDateTime();
        this.sender = new MemberDto(
                chargeRefundInfo.getSenderFirstName(),
                chargeRefundInfo.getSenderLastName(),
                chargeRefundInfo.getSenderEmail()
        );
        this.receiver = new MemberDto(
                chargeRefundInfo.getReceiverFirstName(),
                chargeRefundInfo.getReceiverLastName(),
                chargeRefundInfo.getReceiverEmail()
        );
        if (this.status.equals("B") ||
                this.status.equals("D") ||
                this.status.equals("F") ||
                this.status.equals("H")){
            this.account = new AccountDto(
                    chargeRefundInfo.getAccountId(),
                    chargeRefundInfo.getBank(),
                    chargeRefundInfo.getAccountNumber(),
                    chargeRefundInfo.getAccountFirstName(),
                    chargeRefundInfo.getAccountLastName()
            );
        }

    }
}
