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
public class ProductReviewModifyRequest {

    @JsonProperty("productReviewID")
    private String productReviewID;

    @JsonProperty("review")
    private String review;

    @JsonProperty("score")
    private int score;

}

