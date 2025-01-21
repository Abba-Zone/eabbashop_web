package com.zon.abba.cart.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "Cart")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "CartID", columnDefinition = "CHAR(36)", nullable = false, updatable = false)
    private String cartId;

    @Column(name = "MemberID", length = 36, nullable = false)
    private String memberId;

    @Column(name = "ProductID", length = 36, nullable = false)
    private String productId;

    @Column(name = "Quantity", nullable = false)
    private Integer quantity;

    @Column(name = "SelectYN", length = 1, nullable = false, columnDefinition = "CHAR(1) DEFAULT 'N'")
    private String selectYn;

    @Column(name = "CreatedID", length = 36, nullable = false)
    private String createdId;

    @Column(name = "ModifiedID", length = 36, nullable = false)
    private String modifiedId;

    @CreationTimestamp
    @Column(name = "CreatedDateTime", nullable = false, updatable = false)
    private LocalDateTime createdDateTime;

    @UpdateTimestamp
    @Column(name = "ModifiedDateTime", nullable = false)
    private LocalDateTime modifiedDateTime;

    @Column(name = "DeleteYN", length = 1, nullable = false, columnDefinition = "CHAR(1) DEFAULT 'N'")
    private String deleteYn;

    @PrePersist
    public void perPersist(){

        if(this.createdDateTime == null) this.createdDateTime = LocalDateTime.now();
        if(this.modifiedDateTime == null) this.modifiedDateTime = LocalDateTime.now();

        if(this.deleteYn == null) this.deleteYn = "N";

        if(this.selectYn == null) this.selectYn = "N";
    }

}
