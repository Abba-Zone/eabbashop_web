package com.zon.abba.invoice.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.invoice.dto.AddressDto;
import com.zon.abba.invoice.dto.MemberDto;
import com.zon.abba.invoice.dto.ProductDto;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InvoiceDetailResponse {
    @JsonProperty("invoiceID")
    private String invoiceID;
    @JsonProperty("invoiceNo")
    private String invoiceNo;
    @JsonProperty("IP")
    private String IP;
    @JsonProperty("createdDateTime")
    private LocalDateTime createdDateTime;
    @JsonProperty("products")
    private List<ProductDto> products;
    @JsonProperty("member")
    private MemberDto member;
    @JsonProperty("billAddress")
    private AddressDto billAddress;
    @JsonProperty("shippingAddress")
    private AddressDto shippingAddress;

}
