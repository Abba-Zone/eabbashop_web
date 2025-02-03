package com.zon.abba.auth.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RoleListDetail {
    @JsonProperty("AuthId")
    private String authId;
    @JsonProperty("AuthName")
    private String authName;
    @JsonProperty("Path")
    private String path;
    @JsonProperty("ViewMenuYn")
    private String viewMenuYn;
    @JsonProperty("UseYn")
    private String useYn;
    @JsonProperty("Grade")
    private Integer grade;
}
