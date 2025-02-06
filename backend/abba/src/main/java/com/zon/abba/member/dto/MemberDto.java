package com.zon.abba.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.member.entity.Member;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MemberDto {
    private String memberId;             // id
    private String firstName;          // First name
    private String lastName;           // Last name
    private String email;              // Email
    private String password;           // password
    private String recommendId;        // Recommendation ID
    private String phone;              // Phone number
    private String pinNumber;          // Pin Number
    private Integer failCount;         // Number of failed login attempts
    private String provider;           // provider (e.g., local, Google)
    private String country;            // Country code
    private String grade;              // Grade of the member (e.g. A, B, C)
    private String role;               // Role of the member (e.g. USER, ADMIN)
    private String platform;           // Platform of the member (e.g. zone, net, all)
    private LocalDateTime lastLoginTime; // Last login timestamp
    private String createdId;          // ID of the user who created this member
    private String modifiedId;         // ID of the user who last modified this member
    private LocalDateTime createdDateTime; // Creation timestamp
    private LocalDateTime modifiedDateTime; // Last modification timestamp
    private String deleteYn;           // Deleted flag (Y/N)
    private String activeYn;           // Active flag (Y/N)
    private String receiveConsentYn;   // Consent to receive messages (Y/N)

    private String roleId;

    public MemberDto(Member member){
        this.memberId = member.getMemberId();
        this.firstName = member.getFirstName();
        this.lastName = member.getLastName();
        this.email = member.getEmail();
        this.password = member.getPassword();
        this.phone = member.getPhone();
        this.failCount = member.getFailCount();
        this.provider = member.getProvider();
        this.country = member.getCountry();
        this.grade = member.getGrade();
        this.role = member.getRole();
        this.lastLoginTime = member.getLastLoginTime();
        this.createdId = member.getCreatedId();
        this.modifiedId = member.getModifiedId();
        this.createdDateTime = member.getCreatedDateTime();
        this.modifiedDateTime = member.getModifiedDateTime();
        this.deleteYn = member.getDeleteYN();
        this.activeYn = member.getActiveYN();
        this.receiveConsentYn = member.getReceiveConsentYN();
        this.roleId = member.getRoleID();
    }
}
