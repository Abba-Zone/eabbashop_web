package com.zon.abba.cart.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SelectCartRequest {
    @JsonProperty("cartID")
    private String cartId;
    @JsonProperty("selectYN")
    private Boolean selectYN;
}
