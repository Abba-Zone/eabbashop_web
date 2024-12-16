package com.zon.abba.member.dto;

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
    private String sellerID;
    private String name;
    private String zipCode;
    private String baseAddress;
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
