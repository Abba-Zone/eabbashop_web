package com.zon.abba.order.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductDto {
    @JsonProperty("productID")
    private String productId;
    @JsonProperty("quantity")
    private Integer quantity;
}
