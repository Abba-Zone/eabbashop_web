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
    private UUID recommendedMemberId;

    @Column(name = "ReferredID", columnDefinition = "CHAR(36)", nullable = false)
    private UUID referredId;

    @Column(name = "ReferID", columnDefinition = "CHAR(36)", nullable = false)
    private UUID referId;

    @Column(name = "Status", columnDefinition = "CHAR(1)", nullable = false)
    private String status;

    @Column(name = "CreatedID", columnDefinition = "CHAR(36)", nullable = false)
    private String createdId;

    @Column(name = "ModifiedID", columnDefinition = "CHAR(36)", nullable = false)
    private String modifiedId;

    @CreationTimestamp
    @Column(name = "CreatedDateTime", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP", nullable = false, updatable = false)
    private LocalDateTime createdDateTime;

    @UpdateTimestamp
    @Column(name = "ModifiedDateTime", columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP", nullable = false)
    private LocalDateTime modifiedDateTime;

    @Column(name = "DeleteYN", columnDefinition = "CHAR(1) DEFAULT 'N'", nullable = false)
    private String deleteYN;

    @Column(name = "ActiveYN", columnDefinition = "CHAR(1) DEFAULT 'Y'", nullable = false)
    private String activeYN;

    @Column(name = "ActiveType", columnDefinition = "CHAR(1)")
    private String activeType;

    @Column(name = "ActiveDateTime", columnDefinition = "DATETIME")
    private LocalDateTime activeDateTime;

    @PrePersist
    public void perPersist(){

        if (this.createdId == null) this.createdId = UUID.randomUUID().toString();
        if (this.modifiedId == null) this.modifiedId = UUID.randomUUID().toString();

        if(this.createdDateTime == null) this.createdDateTime = LocalDateTime.now();
        if(this.modifiedDateTime == null) this.modifiedDateTime = LocalDateTime.now();

        if(this.deleteYN == null) this.deleteYN = "N";
        if(this.activeYN == null) this.activeYN = "Y";
    }
}