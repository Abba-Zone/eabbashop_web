package com.zon.abba.address.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "Address")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "AddressID", columnDefinition = "CHAR(36)", nullable = false, updatable = false)
    private String addressId;

    @Column(name = "MemberID", columnDefinition = "CHAR(36)", nullable = false)
    private String memberId;

    @Column(name = "MainAddress", nullable = false)
    private Integer mainAddress;

    @Column(name = "BillAddress", nullable = false)
    private Integer billAddress;

    @Column(name = "Comment", length = 500)
    private String comment;

    @Column(name = "AddressName", length = 100)
    private String addressName;

    @Column(name = "Country", nullable = false)
    private String country;

    @Column(name = "ZipCode", columnDefinition = "CHAR(5)")
    private String zipCode;

    @Column(name = "BaseAddress", length = 100)
    private String baseAddress;

    @Column(name = "DetailAddress", length = 100)
    private String detailAddress;

    @Column(name = "Phone", length = 100)
    private String phone;

    @Column(name = "Name", length = 100)
    private String name;

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

        if (this.createdId == null) this.createdId = UUID.randomUUID().toString();
        if (this.modifiedId == null) this.modifiedId = UUID.randomUUID().toString();

        if(this.createdDateTime == null) this.createdDateTime = LocalDateTime.now();
        if(this.modifiedDateTime == null) this.modifiedDateTime = LocalDateTime.now();

        if(this.deleteYN == null) this.deleteYN = "N";
    }
}