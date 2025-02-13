package com.zon.abba.wishlist.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WishlistIdRequest {
    @JsonProperty("wishlistID")
    private String wishlistID;
    @JsonProperty("productID")
    private String productID;
}
