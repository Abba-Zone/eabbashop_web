package com.zon.abba.point.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RefundRequest {
    @JsonProperty("pointType")
    private String pointType;
    @JsonProperty("amount")
    private Integer amount;
    @JsonProperty("bank")
    private String bank;
    @JsonProperty("accountNumber")
    private String accountNumber;
    @JsonProperty("firstName")
    private String firstName;
    @JsonProperty("lastName")
    private String lastName;
}
