package com.zon.abba.product.request;

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
public class ProductRegisterRequest {
    @JsonProperty("categoryId")
    private String categoryId;

    @JsonProperty("productId")
    private String productId;

    @JsonProperty("name")
    private String name;

    @JsonProperty("taxFreePrice")
    private BigDecimal taxFreePrice;

    @JsonProperty("spPrice")
    private BigDecimal spPrice;

    @JsonProperty("stock")
    private Integer stock;

    @JsonProperty("realPrice")
    private BigDecimal realPrice;

    @JsonProperty("thumbnail")
    private String thumbnail;

    @JsonProperty("description")
    private String description;

    @JsonProperty("summary")
    private String summary;

    @JsonProperty("paybackRatio")
    private double paybackRatio;

    @JsonProperty("allowNation")
    private String allowNation;

    @JsonProperty("showYN")
    private String showYN;

    @JsonProperty("deleteYN")
    private String deleteYN;

    @JsonProperty("activeYN")
    private String activeYN;

    @JsonProperty("viewSite")
    private String viewSite;
}
