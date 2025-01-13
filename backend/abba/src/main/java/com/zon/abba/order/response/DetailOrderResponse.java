package com.zon.abba.order.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.order.dto.AddressInfoDto;
import com.zon.abba.order.dto.MemberInfoDto;
import com.zon.abba.order.dto.OrderInfoDto;
import com.zon.abba.order.dto.ProductInfoDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DetailOrderResponse {
    @JsonProperty("product")
    private ProductInfoDto product;
    @JsonProperty("order")
    private OrderInfoDto order;
    @JsonProperty("address")
    private AddressInfoDto address;
    @JsonProperty("member")
    private MemberInfoDto member;
}
