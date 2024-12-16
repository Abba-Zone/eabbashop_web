package com.zon.abba.member.dto;

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
    private String memberID;
    private String email;
    private String name;
    private String role;
    private String grade;
    private String recommend;
    private String phone;
    private String country;
    private String platform;
    private LocalDateTime createdDateTime;
    private LocalDateTime lastLoginTime;

    public MemberInfoDto(Member member){
        this.memberID = member.getMemberId();
        this.email = member.getEmail();
        this.name = member.getLastName() + " " + member.getFirstName();
        this.role = member.getRole();
        this.grade = member.getGrade();
        this.phone = member.getPhone();
        this.country = member.getCountry();
        this.platform = member.getPlatform();
        this.createdDateTime = member.getCreatedDateTime();
        this.lastLoginTime = member.getLastLoginTime();
    }
}
