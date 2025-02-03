package com.zon.abba.product.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductListResponseShop {
    @JsonProperty("thumbnail")
    public String Thumbnail;

    @JsonProperty("productName")
    public String ProductName;

    @JsonProperty("productID")
    public String ProductId;

    @JsonProperty("price")
    public BigDecimal Price;

    @JsonProperty("averageScore")
    public double AverageScore;
}
