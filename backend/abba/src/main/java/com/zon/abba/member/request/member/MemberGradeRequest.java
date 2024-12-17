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
public class MemberGradeRequest {
    @JsonProperty("memberID")
    private String memberID;

    @JsonProperty("grade")
    private String grade;
}
