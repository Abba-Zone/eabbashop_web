package com.zon.abba.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.member.mapping.ParentTree;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ParentTreeDto {
    @JsonProperty("referredID")
    private String referredId;
    @JsonProperty("referID")
    private String referId;
    @JsonProperty("referRole")
    private String referRole;
    @JsonProperty("firstName")
    private String firstName;
    @JsonProperty("lastName")
    private String lastName;
    @JsonProperty("email")
    private String email;
    @JsonProperty("depth")
    private Integer depth;

    public ParentTreeDto(ParentTree parentTree){
        this.referredId = parentTree.getReferredID();
        this.referId = parentTree.getReferID();
        this.referRole = parentTree.getReferRole();
        this.firstName = parentTree.getFirstName();
        this.lastName = parentTree.getLastName();
        this.email = parentTree.getEmail();
        this.depth = parentTree.getDepth();
    }
}
