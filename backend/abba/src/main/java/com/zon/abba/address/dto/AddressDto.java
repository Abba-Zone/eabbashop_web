package com.zon.abba.address.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonProperty("addressID")
    private String addressID;
    @JsonProperty("country")
    private String country;
    @JsonProperty("zipCode")
    private String zipCode;
    @JsonProperty("baseAddress")
    private String baseAddress;
    @JsonProperty("detailAddress")
    private String detailAddress;
    @JsonProperty("isMain")
    private Boolean isMain;
    @JsonProperty("isBill")
    private Boolean isBill;
    @JsonProperty("firstName")
    private String firstName;
    @JsonProperty("lastName")
    private String lastName;
    @JsonProperty("phone")
    private String phone;
    @JsonProperty("name")
    private String name;
    @JsonProperty("comment")
    private String comment;

    public AddressDto(Address address){
        this.addressID = address.getAddressId();
        this.country = address.getCountry();
        this.zipCode = address.getZipCode();
        this.baseAddress = address.getBaseAddress();
        this.detailAddress = address.getDetailAddress();
        this.isMain = address.getMainAddress();
        this.isBill = address.getBillAddress();
        this.firstName = address.getFirstName();
        this.lastName = address.getLastName();
        this.phone = address.getPhone();
        this.name = address.getAddressName();
        this.comment = address.getComment();

    }
}
