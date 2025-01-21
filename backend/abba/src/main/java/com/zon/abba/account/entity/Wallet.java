package com.zon.abba.account.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "Wallet")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "WalletID", columnDefinition = "CHAR(36)", nullable = false, updatable = false)
    private String walletId;

    @Column(name = "MemberID", columnDefinition = "CHAR(36)", nullable = false)
    private String memberId;

    @Column(name = "LP", precision = 10, scale = 2, nullable = false)
    private BigDecimal lp;

    @Column(name = "AK", precision = 10, scale = 2, nullable = false)
    private BigDecimal ak;

    @Column(name = "ABZ", precision = 10, scale = 2, nullable = false)
    private BigDecimal abz;

    @Column(name = "ABZPoint", precision = 10, scale = 2, nullable = false)
    private BigDecimal abzPoint;

    @Column(name = "AP", precision = 10, scale = 2, nullable = false)
    private BigDecimal ap;

    @Column(name = "SP", precision = 10, scale = 2, nullable = false)
    private BigDecimal sp;

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

    @Column(name = "ActiveYN", columnDefinition = "CHAR(1) DEFAULT 'Y'", nullable = false)
    private String activeYN;

    @PrePersist
    public void perPersist(){

        if(this.createdDateTime == null) this.createdDateTime = LocalDateTime.now();
        if(this.modifiedDateTime == null) this.modifiedDateTime = LocalDateTime.now();

        if(this.deleteYN == null) this.deleteYN = "N";
        if(this.activeYN == null) this.activeYN = "Y";
    }

}