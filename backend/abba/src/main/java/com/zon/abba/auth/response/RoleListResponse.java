package com.zon.abba.auth.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RoleListResponse {
    @JsonProperty("RoleID")
    public String RoleID;
    @JsonProperty("RoleName")
    public String RoleName;

    @JsonProperty("RoleDetail")
    public List<RoleListDetail> RoleDetail;


    public RoleListResponse(String roleID, String roleName) {
        this.RoleID = roleID;
        this.RoleName = roleName;

        RoleDetail = new ArrayList<RoleListDetail>();
    }
}
