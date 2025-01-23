package com.zon.abba.shipment.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.invoice.dto.AddressDto;
import com.zon.abba.invoice.dto.MemberDto;
import com.zon.abba.invoice.dto.ProductDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DetailShipmentResponse {
    @JsonProperty("shipmentID")
    private String shipmentID;
    @JsonProperty("invoiceNo")
    private String invoiceNo;
    @JsonProperty("createdDateTime")
    private LocalDateTime createdDateTime;
    @JsonProperty("scheduledTime")
    private LocalDateTime scheduledTime;
    @JsonProperty("completionTime")
    private LocalDateTime completionTime;
    @JsonProperty("reference")
    private String reference;
    @JsonProperty("IP")
    private String IP;
    @JsonProperty("products")
    private List<ProductDto> products;
    @JsonProperty("member")
    private MemberDto member;
    @JsonProperty("billAddress")
    private AddressDto billAddress;
    @JsonProperty("shippingAddress")
    private AddressDto shippingAddress;
}
