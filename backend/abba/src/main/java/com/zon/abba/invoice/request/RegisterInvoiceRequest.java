package com.zon.abba.invoice.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.order.request.OrderDetailIdRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterInvoiceRequest {
    @JsonProperty("orderDetails")
    private List<OrderDetailIdRequest> orderDetails;
    @JsonProperty("invoiceNo")
    private String invoiceNo;
    @JsonProperty("IP")
    private String IP;
}
