package com.zon.abba.commonCode.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "CommonCode")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommonCode {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "CommonCodeID", columnDefinition = "CHAR(36)", nullable = false, updatable = false)
    private String commonCodeId;

    @Column(name = "CodeGroup", length = 100, nullable = false)
    private String codeGroup;

    @Column(name = "Code", length = 100, nullable = false)
    private String code;

    @Column(name = "CodeName", length = 200, nullable = false)
    private String codeName;

    @Column(name = "codeValue", length = 200, nullable = false)
    private String codeValue;

    @Column(name = "CodeDescription", columnDefinition = "TEXT")
    private String codeDescription;

    @Column(name = "SortOrder", nullable = false)
    private int sortOrder;

    @Column(name = "CreatedID", columnDefinition = "CHAR(36)", nullable = false)
    private String createdId;

    @Column(name = "ModifiedID", columnDefinition = "CHAR(36)", nullable = false)
    private String modifiedId;

    @CreationTimestamp
    @Column(name = "CreatedDateTime", nullable = false, updatable = false)
    private LocalDateTime createdDateTime;

    @UpdateTimestamp
    @Column(name = "ModifiedDateTime", nullable = false)
    private LocalDateTime modifiedDateTime;

    @Column(name = "DeleteYN", columnDefinition = "CHAR(1) DEFAULT 'N'", nullable = false)
    private String deleteYN;

    @Column(name = "ActiveYN", columnDefinition = "CHAR(1) DEFAULT 'Y'", nullable = false)
    private String activeYN;

    @PrePersist
    public void prePersist() {
        if (this.deleteYN == null) this.deleteYN = "N";
        if (this.activeYN == null) this.activeYN = "Y";
    }
}
