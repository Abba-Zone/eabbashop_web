package com.zon.abba.members.dto;

import com.zon.abba.members.entity.Members;
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

    public MemberDto(Members members){
        this.memberId = members.getMemberId();
        this.firstName = members.getFirstName();
        this.lastName = members.getLastName();
        this.email = members.getEmail();
        this.password = members.getPassword();
        this.phone = members.getPhone();
        this.failCount = members.getFailCount();
        this.provider = members.getProvider();
        this.country = members.getCountry();
        this.grade = members.getGrade();
        this.role = members.getRole();
        this.lastLoginTime = members.getLastLoginTime();
        this.createdId = members.getCreatedId();
        this.modifiedId = members.getModifiedId();
        this.createdDateTime = members.getCreatedDateTime();
        this.modifiedDateTime = members.getModifiedDateTime();
        this.deleteYn = members.getDeleteYN();
        this.activeYn = members.getActiveYN();
        this.receiveConsentYn = members.getReceiveConsentYN();
    }
}
