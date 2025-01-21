package com.zon.abba.member.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "ChangeRecommendedMembers")
public class ChangeRecommendedMembers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ChangeRecommendedMemberID")
    private Long changeRecommendedMemberId;

    @Column(name = "NewReferredID", columnDefinition = "CHAR(36)", nullable = false)
    private String newReferredId;

    @Column(name = "ReferID", columnDefinition = "CHAR(36)", nullable = false)
    private String referId;

    @Column(name = "Status", columnDefinition = "CHAR(1)", nullable = false)
    private String status;

    @Column(name = "CreatedID", columnDefinition = "CHAR(36)", nullable = false)
    private String createdId;

    @Column(name = "ModifiedID", columnDefinition = "CHAR(36)")
    private String modifiedId;

    @CreationTimestamp
    @Column(name = "CreatedDateTime", updatable = false)
    private LocalDateTime createdDateTime;

    @UpdateTimestamp
    @Column(name = "ModifiedDateTime")
    private LocalDateTime modifiedDateTime;

    @Column(name = "DeleteYN", columnDefinition = "CHAR(1) DEFAULT 'N'", nullable = false)
    private String deleteYn;

    @Column(name = "ActiveYN", columnDefinition = "CHAR(1) DEFAULT 'Y'", nullable = false)
    private String activeYn;

    @PrePersist
    public void perPersist(){

        if(this.createdDateTime == null) this.createdDateTime = LocalDateTime.now();
        if(this.modifiedDateTime == null) this.modifiedDateTime = LocalDateTime.now();

        if(this.deleteYn == null) this.deleteYn = "N";
        if(this.activeYn == null) this.activeYn = "Y";
    }
}
