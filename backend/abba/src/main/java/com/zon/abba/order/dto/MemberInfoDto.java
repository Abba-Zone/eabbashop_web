package com.zon.abba.order.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberInfoDto {
    @JsonProperty("name")
    private String name;
    @JsonProperty("email")
    private String email;
    @JsonProperty("role")
    private String role;
    @JsonProperty("grade")
    private String grade;

    public MemberInfoDto(Member member){
        this.name = member.getLastName() + " " + member.getFirstName();
        this.email = member.getEmail();
        this.role = member.getRole();
        this.grade = member.getGrade();
    }
}
