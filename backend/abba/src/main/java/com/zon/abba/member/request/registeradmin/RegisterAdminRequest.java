package com.zon.abba.member.request.registeradmin;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterAdminRequest {
    @JsonProperty("WantRole")
    private String WantRole;

    @JsonProperty("RefferedID")
    private String RefferedID;
}
