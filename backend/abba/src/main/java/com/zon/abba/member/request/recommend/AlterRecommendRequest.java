package com.zon.abba.member.request.recommend;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AlterRecommendRequest {
    @JsonProperty("changeRecommendedMemberID")
    private Long changeRecommendedMemberID;
    @JsonProperty("status")
    private String status;
}
