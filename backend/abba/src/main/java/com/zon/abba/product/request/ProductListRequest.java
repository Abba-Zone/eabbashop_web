package com.zon.abba.product.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductListRequest {
    @JsonProperty("SellerID")
    private String SellerID;

    @JsonProperty("ViewSite")
    private String ViewSite;

    @JsonProperty("Nation")
    private String Nation;

    @JsonProperty("ShowYN")
    private String ShowYN;

    @JsonProperty("DeleteYN")
    private String DeleteYN;

    @JsonProperty("ActiveYN")
    private String ActiveYN;
}
