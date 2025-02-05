package com.zon.abba.member.dto;

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
    private String referredId;
    private String referId;
    private String referredRole;
    private Integer depth;

    public ParentTreeDto(ParentTree parentTree){
        this.referredId = parentTree.getReferredID();
        this.referId = parentTree.getReferID();
        this.referredRole = parentTree.getReferredRole();
        this.depth = parentTree.getDepth();
    }
}
