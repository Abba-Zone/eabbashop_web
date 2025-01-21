package com.zon.abba.invoice.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateInvoiceRequest {
    @JsonProperty("invoiceID")
    private String invoiceID;
    @JsonProperty("invoiceNo")
    private String invoiceNo;
    @JsonProperty("status")
    private Integer status;
    @JsonProperty("IP")
    private String IP;
    @JsonProperty("totalLP")
    private BigDecimal totalLP;
    @JsonProperty("totalAK")
    private BigDecimal totalAK;
    @JsonProperty("totalSP")
    private BigDecimal totalSP;
}
