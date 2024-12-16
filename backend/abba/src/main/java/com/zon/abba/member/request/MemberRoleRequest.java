package com.zon.abba.member.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberRoleRequest {
    @JsonProperty("memberID")
    private String memberID;
    @JsonProperty("role")
    private String role;
}
