package com.zon.abba.wishlist.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "Wishlist")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Wishlist {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "WishlistID", columnDefinition = "CHAR(36)", nullable = false, updatable = false)
    private String wishlistId;

    @Column(name = "MemberID", nullable = false, length = 36)
    private String memberId;

    @Column(name = "ProductID", nullable = false, length = 36)
    private String productId;

    @Column(name = "CreatedID", nullable = false, length = 36)
    private String createdId;

    @Column(name = "ModifiedID", nullable = false, length = 36)
    private String modifiedId;

    @CreationTimestamp
    @Column(name = "CreatedDateTime", nullable = false, updatable = false)
    private LocalDateTime createdDateTime;

    @UpdateTimestamp
    @Column(name = "ModifiedDateTime", nullable = false)
    private LocalDateTime modifiedDateTime;

    @Column(name = "DeleteYN", nullable = false, length = 1)
    private String deleteYN;

    @PrePersist
    public void perPersist(){
        if(this.createdDateTime == null) this.createdDateTime = LocalDateTime.now();
        if(this.modifiedDateTime == null) this.modifiedDateTime = LocalDateTime.now();

        if(this.deleteYN == null) this.deleteYN = "N";
    }

}
