package com.zon.abba.member.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "Seller")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Seller {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "SellerID", columnDefinition = "CHAR(36)", nullable = false, updatable = false)
    private String sellerId;

    @Column(name = "MemberID", columnDefinition = "CHAR(36)", nullable = false)
    private String memberId;

    @Column(name = "Name", length = 30, nullable = false)
    private String name;

    @Column(name = "ZipCode", columnDefinition = "CHAR(5)", nullable = false)
    private String zipCode;

    @Column(name = "BaseAddress", length = 100, nullable = false)
    private String baseAddress;

    @Column(name = "DetailAddress", length = 100)
    private String detailAddress;

    @Column(name = "Phone", length = 100)
    private String phone;

    @Column(name = "CreatedID", columnDefinition = "CHAR(36)", nullable = false)
    private String createdId;

    @Column(name = "ModifiedID", columnDefinition = "CHAR(36)")
    private String modifiedId;

    @CreationTimestamp
    @Column(name = "CreatedDateTime", nullable = false, updatable = false)
    private LocalDateTime createdDateTime;

    @UpdateTimestamp
    @Column(name = "ModifiedDateTime")
    private LocalDateTime modifiedDateTime;

    @Column(name = "DeleteYN", columnDefinition = "CHAR(1) DEFAULT 'N'", nullable = false)
    private String deleteYN;

    @PrePersist
    public void perPersist(){

        if(this.createdDateTime == null) this.createdDateTime = LocalDateTime.now();
        if(this.modifiedDateTime == null) this.modifiedDateTime = LocalDateTime.now();

        if(this.deleteYN == null) this.deleteYN = "N";
    }
}
