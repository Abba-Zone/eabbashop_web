package com.zon.abba.invoice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AddressDto {
    @JsonProperty("zipCode")
    private String zipCode;
    @JsonProperty("baseAddress")
    private String baseAddress;
    @JsonProperty("detailAddress")
    private String detailAddress;
    @JsonProperty("phone")
    private String phone;
    @JsonProperty("comment")
    private String comment;
}
