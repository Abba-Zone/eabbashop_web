package com.zon.abba.order.entity;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "Orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "OrderID", columnDefinition = "CHAR(36)", nullable = false, updatable = false)
    private String orderId;

    @Column(name = "MemberID", length = 36, nullable = false)
    private String memberId;

    @Column(name = "LPPrice", precision = 10, scale = 2, nullable = false)
    private BigDecimal lpPrice;

    @Column(name = "AKPrice", precision = 10, scale = 2, nullable = false)
    private BigDecimal akPrice;

    @Column(name = "SPPrice", precision = 10, scale = 2, nullable = false)
    private BigDecimal spPrice;

    @Column(name = "DonationRate", precision = 10, scale = 2, nullable = false)
    private BigDecimal donationRate;

    @Column(name = "BillZipCode", length = 5, nullable = false)
    private String billZipCode;

    @Column(name = "BillBaseAddress", length = 100, nullable = false)
    private String billBaseAddress;

    @Column(name = "BillDetailAddress", length = 100, nullable = true)
    private String billDetailAddress;

    @Column(name = "ZipCode", length = 5, nullable = false)
    private String zipCode;

    @Column(name = "BaseAddress", length = 100, nullable = false)
    private String baseAddress;

    @Column(name = "DetailAddress", length = 100, nullable = true)
    private String detailAddress;

    @Column(name = "Comment", length = 100, nullable = true)
    private String comment;

    @Column(name = "FirstName", length = 100, nullable = false)
    private String firstName;

    @Column(name = "LastName", length = 100, nullable = false)
    private String lastName;

    @Column(name = "Phone", length = 100, nullable = false)
    private String phone;

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

        if (this.createdId == null) this.createdId = UUID.randomUUID().toString();
        if (this.modifiedId == null) this.modifiedId = UUID.randomUUID().toString();

        if(this.createdDateTime == null) this.createdDateTime = LocalDateTime.now();
        if(this.modifiedDateTime == null) this.modifiedDateTime = LocalDateTime.now();

        if(this.deleteYn == null) this.deleteYn = "N";
    }

    @PreUpdate
    public void preUpdate() {
        this.modifiedId = UUID.randomUUID().toString(); // 업데이트 시 새로운 UUID 할당
    }
}
