package com.zon.abba.auth.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RoleAddRequest {
    @JsonProperty("RoleName")
    private String roleName;

    @JsonProperty("AuthIDList")
    private List<String> authIDList;
}
