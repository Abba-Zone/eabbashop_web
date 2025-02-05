package com.zon.abba.point.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class PointHoldingRequest {

    @JsonProperty("orderDetailID")
    private String orderDetailId;

    /*  A	물건 판매
        B	수당 라인*/
    @JsonProperty("type")
    private String type;

    @JsonProperty("lp")
    private BigDecimal lp = BigDecimal.ZERO;

    @JsonProperty("ak")
    private BigDecimal ak = BigDecimal.ZERO;

    @JsonProperty("sp")
    private BigDecimal sp = BigDecimal.ZERO;

}
