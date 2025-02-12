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
public class ProductReviewRequest {

    @JsonProperty("orderDetailID")
    private String orderDetailID;

    @JsonProperty("review")
    private String review;

    @JsonProperty("score")
    private int score;

}

