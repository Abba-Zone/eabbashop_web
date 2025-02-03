package com.zon.abba.product.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductListResponseAdmin {
    @JsonProperty("productId")
    public String ProductId;

    @JsonProperty("productName")
    public String ProductName;

    @JsonProperty("sellerName")
    public String SellerName;

    @JsonProperty("stock")
    public int Stock;

    @JsonProperty("activeYN")
    public String ActiveYN;
}
