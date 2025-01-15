package com.zon.abba.member.request.recommend;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ChangeRecommendRequest {
    @JsonProperty("referID")
    private String referID; // 추천인 바꾸고 싶은 사람
    @JsonProperty("referredID")
    private String referredID; // 바뀔 추천인 ID
}
