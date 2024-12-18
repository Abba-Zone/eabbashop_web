package com.zon.abba.member.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "RecommendedMembersAlterLog")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecommendedMembersAlterLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "LogID", nullable = false)
    private Long logId;

    @Column(name = "RecommendedMemberID", columnDefinition = "CHAR(36)", nullable = false)
    private String recommendedMemberId;

    @Column(name = "ReferredID", columnDefinition = "CHAR(36)", nullable = false)
    private String referredId;

    @Column(name = "ReferID", columnDefinition = "CHAR(36)", nullable = false)
    private String referId;

    @Column(name = "CreatedID", columnDefinition = "CHAR(36)", nullable = false)
    private String createdId;

    @Column(name = "ModifiedID", columnDefinition = "CHAR(36)", nullable = false)
    private String modifiedId;

    @Column(name = "CreatedDateTime", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", nullable = false, updatable = false)
    private LocalDateTime createdDateTime;

    @Column(name = "ModifiedDateTime", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP", nullable = false)
    private LocalDateTime modifiedDateTime;

    @Column(name = "DeleteYN", columnDefinition = "CHAR(1) DEFAULT 'N'", nullable = false)
    private String deleteYN;

    @Column(name = "ActiveYN", columnDefinition = "CHAR(1) DEFAULT 'Y'", nullable = false)
    private String activeYN;

    @Column(name = "ActiveType", columnDefinition = "CHAR(1)")
    private String activeType;

    @CreationTimestamp
    @Column(name = "ActiveDateTime", columnDefinition = "DATETIME")
    private LocalDateTime activeDateTime;

    public RecommendedMembersAlterLog(RecommendedMember recommendedMember, String activeType){
        this.recommendedMemberId = recommendedMember.getRecommendedMemberId();
        this.referredId = recommendedMember.getReferredId();
        this.referId = recommendedMember.getReferId();
        this.createdId = recommendedMember.getCreatedId();
        this.modifiedId = recommendedMember.getModifiedId();
        this.createdDateTime = recommendedMember.getCreatedDateTime();
        this.modifiedDateTime = recommendedMember.getModifiedDateTime();
        this.deleteYN = recommendedMember.getDeleteYN();
        this.activeYN = recommendedMember.getActiveYN();
        this.activeType = activeType;
    }
}