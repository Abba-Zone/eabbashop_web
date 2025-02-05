package com.zon.abba.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberInfoDto {
    @JsonProperty("memberID")
    private String memberID;
    @JsonProperty("email")
    private String email;
    @JsonProperty("firstName")
    private String firstName;
    @JsonProperty("lastName")
    private String lastName;
    @JsonProperty("role")
    private String role;
    @JsonProperty("grade")
    private String grade;
    @JsonProperty("recommend")
    private String recommend;
    @JsonProperty("phone")
    private String phone;
    @JsonProperty("country")
    private String country;
    @JsonProperty("platform")
    private String platform;
    @JsonProperty("createdDateTime")
    private LocalDateTime createdDateTime;
    @JsonProperty("lastLoginTime")
    private LocalDateTime lastLoginTime;

    public MemberInfoDto(Member member){
        this.memberID = member.getMemberId();
        this.email = member.getEmail();
        this.firstName = member.getFirstName();
        this.lastName = member.getLastName();
        this.role = member.getRole();
        this.grade = member.getGrade();
        this.phone = member.getPhone();
        this.country = member.getCountry();
        this.platform = member.getPlatform();
        this.createdDateTime = member.getCreatedDateTime();
        this.lastLoginTime = member.getLastLoginTime();
    }
}
