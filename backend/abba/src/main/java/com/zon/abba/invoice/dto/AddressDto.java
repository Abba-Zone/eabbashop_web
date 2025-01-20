package com.zon.abba.invoice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AddressDto {
    @JsonProperty("zipCode")
    private String zipCode;
    @JsonProperty("baseAddress")
    private String baseAddress;
    @JsonProperty("detailAddress")
    private String detailAddress;
    @JsonProperty("name")
    private String name;
    @JsonProperty("phone")
    private String phone;
    @JsonProperty("comment")
    private String comment;
}
