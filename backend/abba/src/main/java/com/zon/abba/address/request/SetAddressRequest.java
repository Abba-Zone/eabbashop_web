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
public class SetAddressRequest {
    @JsonProperty("addressID")
    private String addressId;
    @JsonProperty("preAddressID")
    private String preAddressId;
}
