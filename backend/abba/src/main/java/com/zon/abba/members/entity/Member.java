package com.zon.abba.members.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "members")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // UUID 자동 생성
    @Column(name = "member_id", nullable = false, updatable = false, unique = true)
    private UUID memberId;

    @Column(name = "first_name", length = 50, nullable = false)
    private String firstName;

    @Column(name = "last_name", length = 50, nullable = false)
    private String lastName;

    @Column(name = "email", length = 100, nullable = false)
    private String email;

    @Column(name = "password", length = 200, nullable = false)
    private String password;

    @Column(name = "recommend_id", length = 20)
    private String recommendId;

    @Column(name = "phone", length = 50, nullable = false)
    private String phone;

    @Column(name = "fail_count", nullable = false)
    private Integer failCount;

    @Column(name = "provider", length = 10, nullable = false)
    private String provider;

    @Column(name = "country", length = 3)
    private String country;

    @Column(name = "grade", length = 1, nullable = false)
    private String grade;

    @Column(name = "role", length = 1, nullable = false)
    private String role;

    @Column(name = "last_login_time", nullable = false)
    private LocalDateTime lastLoginTime;

    @Column(name = "created_id", length = 36, nullable = false)
    private String createdId;

    @Column(name = "modified_id", length = 36, nullable = false)
    private String modifiedId;

    @Column(name = "created_date_time", nullable = false)
    private LocalDateTime createdDateTime;

    @Column(name = "modified_date_time", nullable = true)
    private LocalDateTime modifiedDateTime;

    @Column(name = "delete_yn", length = 1, nullable = false)
    private String deleteYn;

    @Column(name = "active_yn", length = 1, nullable = false)
    private String activeYn;

    @Column(name = "mac_address", length = 100, nullable = true)
    private String macAddress;

    @Column(name = "receive_consent_yn", length = 1, nullable = false)
    private String receiveConsentYn;

    @Column(name = "push_consent_yn", length = 1, nullable = false)
    private String pushConsentYn;

    @PrePersist
    public void perPersist(){
        if(this.failCount == null) this.failCount = 0;
        if(this.lastLoginTime == null) this.lastLoginTime = LocalDateTime.now();
        if(this.receiveConsentYn == null) this.receiveConsentYn = "N";
        if(this.pushConsentYn == null) this.pushConsentYn = "N";
        if(this.createdDateTime == null) this.createdDateTime = LocalDateTime.now();
        if(this.modifiedDateTime == null) this.modifiedDateTime = LocalDateTime.now();
        if(this.deleteYn == null) this.deleteYn = "N";
        if(this.activeYn == null) this.activeYn = "Y";
        if(this.createdId == null) this.createdId = UUID.randomUUID().toString();
        if(this.modifiedId == null) this.modifiedId = UUID.randomUUID().toString();
    }

}
