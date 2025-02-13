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
public class MyProductReviewResponse {

    @JsonProperty("productID")
    private String productID;

    @JsonProperty("productName")
    private String productName;

    @JsonProperty("productReviewID")
    private String productReviewID;

    @JsonProperty("review")
    private String review;

    @JsonProperty("like")
    private int like;

    @JsonProperty("dislike")
    private int dislike;

    @JsonProperty("score")
    private int score;

}
