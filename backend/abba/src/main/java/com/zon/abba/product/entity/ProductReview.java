package com.zon.abba.product.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "ProductReview")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductReview {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "ProductReviewID", columnDefinition = "CHAR(36)", nullable = false, updatable = false)
    private String productReviewId;

    @Column(name = "ProductID", columnDefinition = "CHAR(36)", nullable = false)
    private String productId;

    @Column(name = "MemberID", columnDefinition = "CHAR(36)", nullable = false)
    private String memberId;

    @Column(name = "SellerID", columnDefinition = "CHAR(36)", nullable = false)
    private String sellerId;

    @Column(name = "OrderDetailID", columnDefinition = "CHAR(36)", nullable = false)
    private String orderDetailId;

    @Column(name = "Score", nullable = false)
    private int score;

    @Column(name = "Comment", columnDefinition = "TEXT")
    private String comment;

    @Column(name = "Likes", nullable = false)
    private int likes;

    @Column(name = "Dislikes", nullable = false)
    private int dislikes;

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

    @PrePersist
    public void prePersist() {
        if (this.deleteYN == null) this.deleteYN = "N";
        if (this.score == 0) this.score = 0; // 기본값 설정 (필요시 수정)
        if (this.likes == 0) this.likes = 0;
        if (this.dislikes == 0) this.dislikes = 0;
    }
}