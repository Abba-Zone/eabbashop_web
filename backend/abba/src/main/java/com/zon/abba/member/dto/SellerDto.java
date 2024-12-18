package com.zon.abba.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.member.entity.Seller;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SellerDto {
    @JsonProperty("sellerID")
    private String sellerID;
    private String name;
    @JsonProperty("zipCode")
    private String zipCode;
    @JsonProperty("baseAddress")
    private String baseAddress;
    @JsonProperty("detailAddress")
    private String detailAddress;
    private String phone;

    public SellerDto(Seller seller){
        this.sellerID = seller.getSellerId();
        this.name = seller.getName();
        this.zipCode = seller.getZipCode();
        this.baseAddress = seller.getBaseAddress();
        this.detailAddress = seller.getDetailAddress();
        this.phone = seller.getPhone();
    }
}
