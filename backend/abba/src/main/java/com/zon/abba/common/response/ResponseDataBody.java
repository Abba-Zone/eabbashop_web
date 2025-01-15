package com.zon.abba.common.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResponseDataBody {
    @JsonProperty("message")
    private String message;
    @JsonProperty("list")
    private Object list;
}
