package com.zon.abba.product.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateYNRequest {
    @JsonProperty("productId")
    private String productId;
    @JsonProperty("YN")
    private String YN;
}