package com.zon.abba.order.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.cart.request.CartIdRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterCartOrderRequest {
    @JsonProperty("addressID")
    private String addressId;
    @JsonProperty("billAddressID")
    private String billAddressId;
    @JsonProperty("carts")
    List<CartIdRequest> carts;
}
