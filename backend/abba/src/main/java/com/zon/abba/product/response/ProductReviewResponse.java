package com.zon.abba.product.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.product.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProductReviewResponse {
    @JsonProperty("productReviewID")
    private String productReviewID;

    @JsonProperty("review")
    private String review;

    @JsonProperty("like")
    private int like;

    @JsonProperty("dislike")
    private int dislike;

}
