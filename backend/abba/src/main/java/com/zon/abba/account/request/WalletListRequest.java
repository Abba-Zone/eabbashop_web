package com.zon.abba.account.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WalletListRequest {
    @JsonProperty("pageNo")
    private Integer pageNo;

    @JsonProperty("pageSize")
    private Integer pageSize;

    @JsonProperty("startDate")
    private String startDate;

    @JsonProperty("endDate")
    private String endDate;

    @JsonProperty("memberID")
    private String memberID;
}
