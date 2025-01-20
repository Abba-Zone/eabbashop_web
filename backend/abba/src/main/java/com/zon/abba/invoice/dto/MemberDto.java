package com.zon.abba.invoice.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MemberDto {
    @JsonProperty("name")
    private String name;
    @JsonProperty("email")
    private String email;
    @JsonProperty("role")
    private String role;
    @JsonProperty("grade")
    private String grade;
    @JsonProperty("phone")
    private String phone;

    public MemberDto(Member member){
        this.name = member.getLastName() + " " + member.getFirstName();
        this.email = member.getEmail();
        this.role = member.getRole();
        this.grade = member.getGrade();
        this.phone = member.getPhone();
    }


}
