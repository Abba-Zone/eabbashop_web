package com.zon.abba.invoice.response;

import com.zon.abba.invoice.dto.AddressDto;
import com.zon.abba.invoice.dto.MemberDto;
import com.zon.abba.invoice.dto.OrderDetailDto;
import com.zon.abba.order.entity.OrderDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceDetailResponse {
    private String invoiceID;
    private String invoiceNo;
    private String IP;
    private List<OrderDetailDto> orderDetails;
    private MemberDto member;
    private AddressDto billAddress;
    private AddressDto shippingAddress;


}
