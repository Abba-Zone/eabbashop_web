package com.zon.abba.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.member.mapping.ChangeRecommendedMembersList;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChangeRecommendedMembersListDto {
    @JsonProperty("changeRecommendedMemberID")
    private Long changeRecommendedMemberId;
    @JsonProperty("referredName")
    private String referredName;
    @JsonProperty("referName")
    private String referName;
    @JsonProperty("status")
    private String status;
    @JsonProperty("createdDateTime")
    private LocalDateTime createdDateTime;

    public ChangeRecommendedMembersListDto(ChangeRecommendedMembersList changeRecommendedMembersList){
        this.changeRecommendedMemberId = changeRecommendedMembersList.getChangeRecommendedMemberId();
        this.referredName = changeRecommendedMembersList.getReferredName();
        this.referName = changeRecommendedMembersList.getReferName();
        this.status = changeRecommendedMembersList.getStatus();
        this.createdDateTime = changeRecommendedMembersList.getCreatedDateTime();
    }
}
