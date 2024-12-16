package com.zon.abba.address.dto;

import com.zon.abba.address.entity.Address;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddressDto {
    private String addressID;
    private String country;
    private String zipCode;
    private String baseAddress;
    private String detailAddress;
    private Boolean isMain;
    private Boolean isBill;
    private String host;
    private String phone;
    private String name;
    private String comment;

    public AddressDto(Address address){
        this.addressID = address.getAddressId();
        this.country = address.getCountry();
        this.zipCode = address.getZipCode();
        this.baseAddress = address.getBaseAddress();
        this.detailAddress = address.getDetailAddress();
        this.isMain = address.getMainAddress() == 1;
        this.isBill = address.getBillAddress() == 1;
        this.host = address.getName();
        this.phone = address.getPhone();
        this.name = address.getAddressName();
        this.comment = address.getComment();

    }
}
