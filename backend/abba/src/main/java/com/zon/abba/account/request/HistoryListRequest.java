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
public class HistoryListRequest {
    @JsonProperty("pageNo")
    private Integer pageNo;
    @JsonProperty("pageSize")
    private Integer pageSize;
    @JsonProperty("type")
    private String type;
}
