package com.zon.abba.member.dto;

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
    private String memberId;
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
}
