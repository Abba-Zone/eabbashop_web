package com.zon.abba.order.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.address.entity.Address;
import com.zon.abba.order.entity.Orders;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AddressInfoDto {
    @JsonProperty("name")
    private String name;
    @JsonProperty("phone")
    private String phone;
    @JsonProperty("zipCode")
    private String zipCode;
    @JsonProperty("baseAddress")
    private String baseAddress;
    @JsonProperty("detailAddress")
    private String detailAddress;
    @JsonProperty("billZipCode")
    private String billZipCode;
    @JsonProperty("billBaseAddress")
    private String billBaseAddress;
    @JsonProperty("billDetailAddress")
    private String billDetailAddress;
    @JsonProperty("comment")
    private String comment;

    public AddressInfoDto(Orders orders){
        this.name = orders.getLastName() + " " + orders.getFirstName();
        this.phone = orders.getPhone();
        this.zipCode = orders.getZipCode();
        this.baseAddress = orders.getBaseAddress();
        this.detailAddress = orders.getDetailAddress();
        this.billZipCode = orders.getZipCode();
        this.billBaseAddress = orders.getBaseAddress();
        this.billDetailAddress = orders.getDetailAddress();
        this.comment = orders.getComment();
    }
}
