package com.zon.abba.product.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductListRequest {

    @JsonProperty("page")
    private int page;

    @JsonProperty("size")
    private int size;

    @JsonProperty("orderBy")
    private String orderBy;

    @JsonProperty("orderByType")
    private String orderByType;


    @JsonProperty("SellerID")
    private String SellerID;

    @JsonProperty("CategoryID")
    private String CategoryID;

    @JsonProperty("Name")
    private String Name;

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

    @JsonProperty("StartPrice")
    private BigDecimal StartPrice;

    @JsonProperty("EndPrice")
    private BigDecimal EndPrice;


}

