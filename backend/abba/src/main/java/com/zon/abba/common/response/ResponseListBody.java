package com.zon.abba.common.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseListBody {
    @JsonProperty("totalCount")
    private Long totalCount;
    @JsonProperty("list")
    private List<?> list;
}
