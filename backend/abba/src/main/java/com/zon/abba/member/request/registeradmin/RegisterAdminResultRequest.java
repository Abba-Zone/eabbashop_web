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
public class RegisterAdminResultRequest {
    @JsonProperty("Changerequestid")
    private String changeRequestId;
    
    // 상태
    @JsonProperty("Status")
    private String status;
}
