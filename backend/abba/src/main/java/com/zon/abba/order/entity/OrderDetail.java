package com.zon.abba.order.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "OrderDetail")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class OrderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "OrderDetailID", length = 36, nullable = false, updatable = false)
    private String orderDetailId;

    @Column(name = "OrderID", length = 36, nullable = false)
    private String orderId;

    @Column(name = "MemberID", length = 36, nullable = false)
    private String memberId;

    @Column(name = "ProductID", length = 36, nullable = false)
    private String productId;

    @Column(name = "Quantity", nullable = false)
    private Integer quantity;

    @Column(name = "Status", nullable = false, columnDefinition = "INT DEFAULT 1")
    private Integer status;

    @Column(name = "LPPrice", precision = 65, scale = 2, nullable = false)
    private BigDecimal lpPrice;

    @Column(name = "AKPrice", precision = 65, scale = 2, nullable = false)
    private BigDecimal akPrice;

    @Column(name = "SPPrice", precision = 65, scale = 2, nullable = false)
    private BigDecimal spPrice;

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
    }

}
