package com.zon.abba.member.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@DynamicInsert
@Table(name = "Members")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "MemberID", columnDefinition = "CHAR(36)", updatable = false, nullable = false)
    private String memberId;

    @Column(name = "FirstName", length = 50, nullable = false)
    private String firstName;

    @Column(name = "LastName", length = 50, nullable = false)
    private String lastName;

    @Column(name = "Email", length = 100, nullable = false)
    private String email;

    @Column(name = "Password", length = 200)
    private String password;

    @Column(name = "Phone", length = 50, nullable = false)
    private String phone;

    @Column(name = "PinNumber", length = 6, columnDefinition = "CHAR(6)")
    private String pinNumber;

    @Column(name = "FailCount", columnDefinition = "INT DEFAULT 0", nullable = false)
    private Integer failCount;

    @Column(name = "Provider", length = 10, columnDefinition = "VARCHAR(10) DEFAULT 'local'", nullable = false)
    private String provider;

    @Column(name = "Country", length = 3, columnDefinition = "CHAR(3)")
    private String country;

    @Column(name = "Grade", length = 1, nullable = false, columnDefinition = "CHAR(1)")
    private String grade;

    @Column(name = "Role", length = 1, nullable = false, columnDefinition = "CHAR(1)")
    private String role;

    @Column(name = "Platform", length = 4, nullable = false, columnDefinition = "CHAR(4)")
    private String platform;

    @Column(name = "LastLoginTime", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", nullable = false)
    private LocalDateTime lastLoginTime;

    @Column(name = "ReceiveConsentYN", length = 1, nullable = false, columnDefinition = "CHAR(1)")
    private String receiveConsentYN;

    @Column(name = "CreatedID", columnDefinition = "CHAR(36)", nullable = false)
    private String createdId;

    @Column(name = "ModifiedID", columnDefinition = "CHAR(36)", nullable = false)
    private String modifiedId;

    @CreationTimestamp
    @Column(name = "CreatedDateTime", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", updatable = false, nullable = false)
    private LocalDateTime createdDateTime;

    @UpdateTimestamp
    @Column(name = "ModifiedDateTime", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", nullable = false)
    private LocalDateTime modifiedDateTime;

    @Column(name = "DeleteYN", length = 1, columnDefinition = "CHAR(1) DEFAULT 'N'", nullable = false)
    private String deleteYN;

    @Column(name = "ActiveYN", length = 1, columnDefinition = "CHAR(1) DEFAULT 'Y'", nullable = false)
    private String activeYN;


    @PrePersist
    public void perPersist(){
        if(this.lastLoginTime == null) this.lastLoginTime = LocalDateTime.now();
        if(this.receiveConsentYN == null) this.receiveConsentYN = "Y";
//        if (this.createdId == null) this.createdId = UUID.randomUUID().toString();
//        if (this.modifiedId == null) this.modifiedId = UUID.randomUUID().toString();
        if (this.failCount == null) this.failCount = 0;
        if(this.createdDateTime == null) this.createdDateTime = LocalDateTime.now();
        if(this.modifiedDateTime == null) this.modifiedDateTime = LocalDateTime.now();
        if(this.grade == null) this.grade = "A";
        if(this.role == null) this.role = "A";
        if(this.deleteYN == null) this.deleteYN = "N";
        if(this.activeYN == null) this.activeYN = "Y";
    }

}
