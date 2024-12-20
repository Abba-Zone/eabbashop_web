package com.zon.abba.address.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterAddressRequest {
    @JsonProperty("name")
    private String name;
    @JsonProperty("firstName")
    private String firstName;
    @JsonProperty("lastName")
    private String lastName;
    @JsonProperty("phone")
    private String phone;
    @JsonProperty("country")
    private String country;
    @JsonProperty("zipCode")
    private String zipCode;
    @JsonProperty("bassAddress")
    private String bassAddress;
    @JsonProperty("detailAddress")
    private String detailAddress;
    @JsonProperty("comment")
    private String comment;
    @JsonProperty("isMain")
    private Boolean isMain;
    @JsonProperty("isBill")
    private Boolean isBill;
}
