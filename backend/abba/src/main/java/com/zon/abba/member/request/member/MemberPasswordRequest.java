package com.zon.abba.member.request.member;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberPasswordRequest {
    @JsonProperty("email")
    private String email;

    @JsonProperty("password")
    private String password;
}
