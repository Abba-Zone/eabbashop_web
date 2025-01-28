package com.zon.abba.order.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductStockResponse {
    @JsonProperty("productID")
    private String productID;
    @JsonProperty("name")
    private String name;
}
