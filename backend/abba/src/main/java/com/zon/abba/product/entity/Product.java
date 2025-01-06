package com.zon.abba.product.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "Product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "ProductID", columnDefinition = "CHAR(36)", nullable = false, updatable = false)
    private String productId;

    @Column(name = "CategoryID", length = 100, nullable = false)
    private String categoryId;

    @Column(name = "SellerID", columnDefinition = "CHAR(36)", nullable = false)
    private String sellerId;

    @Column(name = "Name", length = 200, nullable = false)
    private String name;

    @Column(name = "TaxFreePrice", precision = 10, scale = 2, nullable = false)
    private BigDecimal taxFreePrice;

    @Column(name = "SPPrice", precision = 10, scale = 2, nullable = false)
    private BigDecimal spPrice;

    @Column(name = "Stock", nullable = false)
    private int stock;

    @Column(name = "RealPrice", precision = 10, scale = 2, nullable = false)
    private BigDecimal realPrice;

    @Column(name = "Thumbnail", length = 100)
    private String thumbnail;

    @Column(name = "Description", columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(name = "Summary", length = 100, nullable = false)
    private String summary;

    @Column(name = "PaybackRatio", nullable = false)
    private double paybackRatio;

    @Column(name = "AllowNation", length = 200)
    private String allowNation;

    @Column(name = "ViewSite", columnDefinition = "CHAR(1) DEFAULT 'A'", nullable = false)
    private String viewSite;

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

    @Column(name = "ShowYN", columnDefinition = "CHAR(1) DEFAULT 'Y'", nullable = false)
    private String showYN;

    @Column(name = "DeleteYN", columnDefinition = "CHAR(1) DEFAULT 'N'", nullable = false)
    private String deleteYN;

    @Column(name = "ActiveYN", columnDefinition = "CHAR(1) DEFAULT 'Y'", nullable = false)
    private String activeYN;

    @PrePersist
    public void prePersist() {
        if (this.showYN == null) this.showYN = "Y";
        if (this.deleteYN == null) this.deleteYN = "N";
        if (this.activeYN == null) this.activeYN = "Y";
        if (this.viewSite == null) this.viewSite = "A";
    }
}