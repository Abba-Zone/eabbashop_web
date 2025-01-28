package com.zon.abba.order.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.order.dto.ProductDto;
import lombok.*;

import java.util.List;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterOrderRequest {
    @JsonProperty("isUseAK")
    private Boolean isUseAK;
    @JsonProperty("addressID")
    private String addressId;
    @JsonProperty("billAddressID")
    private String billAddressId;
    @JsonProperty("products")
    private List<ProductDto> products;
}
