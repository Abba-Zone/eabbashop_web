package com.zon.abba.point.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Setter
@Getter
public class ExchangeRateResponse {

    @JsonProperty("base_code")
    private String baseCode;
    @JsonProperty("conversion_rates")
    private Map<String, Double> ConversionRates;

}
