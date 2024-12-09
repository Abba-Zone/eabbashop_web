package com.zon.abba.members.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "Members")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "MemberID", columnDefinition = "CHAR(36)", updatable = false, nullable = false)
    private UUID memberId;

    @Column(name = "FirstName", length = 50, nullable = false)
    private String firstName;

    @Column(name = "LastName", length = 50, nullable = false)
    private String lastName;

    @Column(name = "Email", length = 100, nullable = false)
    private String email;

    @Column(name = "Password", length = 200)
    private String password;

    @Column(name = "Phone", length = 20, nullable = false)
    private String phone;

    @Column(name = "PinNumber", length = 6, nullable = false)
    private String pinNumber;

    @Column(name = "FailCount", columnDefinition = "INT DEFAULT 0", nullable = false)
    private int failCount;

    @Column(name = "Provider", length = 10, columnDefinition = "VARCHAR(10) DEFAULT 'local'")
    private String provider;

    @Column(name = "Country", length = 3)
    private String country;

    @Column(name = "Grade", length = 1)
    private String grade;

    @Column(name = "Role", length = 1)
    private String role;

    @Column(name = "Platform", length = 1)
    private String platform;

    @Column(name = "LastLoginTime", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime lastLoginTime;

    @Column(name = "ReceiveConsentYN", length = 1)
    private String receiveConsentYN;

    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "CreatedID", columnDefinition = "CHAR(36)", updatable = false)
    private UUID createdId;

    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "ModifiedID", columnDefinition = "CHAR(36)")
    private UUID modifiedId;

    @Column(name = "CreatedDateTime", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", updatable = false)
    private LocalDateTime createdDateTime;

    @Column(name = "ModifiedDateTime", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime modifiedDateTime;

    @Column(name = "DeleteYN", length = 1, columnDefinition = "CHAR(1) DEFAULT 'N'")
    private String deleteYN;

    @Column(name = "ActiveYN", length = 1, columnDefinition = "CHAR(1) DEFAULT 'Y'")
    private String activeYN;


    @PrePersist
    public void perPersist(){
        if(this.lastLoginTime == null) this.lastLoginTime = LocalDateTime.now();
        if(this.receiveConsentYN == null) this.receiveConsentYN = "Y";
        if(this.createdDateTime == null) this.createdDateTime = LocalDateTime.now();
        if(this.modifiedDateTime == null) this.modifiedDateTime = LocalDateTime.now();
        if(this.grade == null) this.grade = "A";
        if(this.role == null) this.role = "A";
    }

}
