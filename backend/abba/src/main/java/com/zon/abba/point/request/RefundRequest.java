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
    @JsonProperty("point")
    private Integer point;
    @JsonProperty("accountID")
    private String accountID;
    @JsonProperty("parentID")
    private String parentID;
}
