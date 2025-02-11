package com.zon.abba.point.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.point.mapping.TransferList;
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
public class TransferDto {
    @JsonProperty("transferID")
    private String transferID;
    @JsonProperty("senderFirstName")
    private String senderFirstName;
    @JsonProperty("senderLastName")
    private String senderLastName;
    @JsonProperty("receiverFirstName")
    private String receiverFirstName;
    @JsonProperty("receiverLastName")
    private String receiverLastName;
    @JsonProperty("LP")
    private BigDecimal LP;
    @JsonProperty("AK")
    private BigDecimal AK;
    @JsonProperty("SP")
    private BigDecimal SP;
    @JsonProperty("status")
    private String status;
    @JsonProperty("modifiedDateTime")
    private LocalDateTime modifiedDateTime;

    public TransferDto(TransferList transferList){
        this.transferID = transferList.getTransferId();
        this.senderFirstName = transferList.getSenderFirstName();
        this.senderLastName = transferList.getSenderLastName();
        this.receiverFirstName = transferList.getReceiverFirstName();
        this.receiverLastName = transferList.getReceiverLastName();
        this.LP = transferList.getLp();
        this.AK = transferList.getAk();
        this.SP = transferList.getSp();
        this.status = transferList.getStatus();
        this.modifiedDateTime = transferList.getModifiedDateTime();
    }
}
