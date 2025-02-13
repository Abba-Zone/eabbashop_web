package com.zon.abba.member.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.member.mapping.SellerDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SellerDetailResponse {
    @JsonProperty("sellerID")
    private String sellerID;
    @JsonProperty("name")
    private String name;
    @JsonProperty("firstName")
    private String firstName;
    @JsonProperty("lastName")
    private String lastName;
    @JsonProperty("phone")
    private String phone;
    @JsonProperty("email")
    private String email;
    @JsonProperty("zipCode")
    private String zipCode;
    @JsonProperty("baseAddress")
    private String baseAddress;
    @JsonProperty("detailAddress")
    private String detailAddress;
    @JsonProperty("createdDateTime")
    private LocalDateTime createdDateTime;

    public SellerDetailResponse(SellerDetail sellerDetail){
        this.sellerID = sellerDetail.getSellerId();
        this.name = sellerDetail.getName();
        this.firstName = sellerDetail.getFirstName();
        this.lastName = sellerDetail.getLastName();
        this.phone = sellerDetail.getPhone();
        this.zipCode = sellerDetail.getZipCode();
        this.baseAddress = sellerDetail.getBaseAddress();
        this.detailAddress = sellerDetail.getDetailAddress();
        this.createdDateTime = sellerDetail.getCreatedDateTime();
        this.email = sellerDetail.getEmail();
    }
}
