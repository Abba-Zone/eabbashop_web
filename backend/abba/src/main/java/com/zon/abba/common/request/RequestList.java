package com.zon.abba.common.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RequestList {
    @JsonProperty("pageNo")
    private Integer pageNo;
    @JsonProperty("pageSize")
    private Integer pageSize;
    @JsonProperty("sort")
    private String sort;
    @JsonProperty("sortValue")
    private String sortValue;
    @JsonProperty("filter")
    private String filter;
    @JsonProperty("filterValue")
    private String filterValue;
}
