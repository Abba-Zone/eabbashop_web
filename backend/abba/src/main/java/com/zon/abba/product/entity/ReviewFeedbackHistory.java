package com.zon.abba.product.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "ReviewFeedbackHistory")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewFeedbackHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "ProductReviewLogID", columnDefinition = "CHAR(36)", nullable = false, updatable = false)
    private String productReviewLogId;

    @Column(name = "ProductReviewID", columnDefinition = "CHAR(36)", nullable = false)
    private String productReviewId;

    @Column(name = "MemberID", columnDefinition = "CHAR(36)", nullable = false)
    private String memberId;

    @Column(name = "Type", nullable = false)
    private Integer type;

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
    private String deleteYn;

    @PrePersist
    public void prePersist() {
        if (this.deleteYn == null) this.deleteYn = "N";
    }
}