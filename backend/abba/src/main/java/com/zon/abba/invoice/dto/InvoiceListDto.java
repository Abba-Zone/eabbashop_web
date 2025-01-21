package com.zon.abba.invoice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.invoice.mapping.InvoiceList;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceListDto {
    @JsonProperty("invoiceID")
    private String invoiceID;
    @JsonProperty("orderID")
    private String orderID;
    @JsonProperty("invoiceNo")
    private String invoiceNo;
    @JsonProperty("recipientName")
    private String recipientName;
    @JsonProperty("status")
    private Integer status;
    @JsonProperty("createdDateTime")
    private LocalDateTime createdDateTime;

    public InvoiceListDto(InvoiceList invoiceList){
        this.invoiceID = invoiceList.getInvoiceId();
        this.orderID = invoiceList.getOrderId();
        this.invoiceNo = invoiceList.getInvoiceNo();
        this.recipientName = invoiceList.getRecipientName();
        this.status = invoiceList.getStatus();
        this.createdDateTime = invoiceList.getCreatedDateTime();
    }
}
