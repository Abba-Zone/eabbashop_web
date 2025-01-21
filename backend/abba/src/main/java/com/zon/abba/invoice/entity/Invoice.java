package com.zon.abba.invoice.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "Invoice")
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "InvoiceID", columnDefinition = "CHAR(36)", nullable = false, updatable = false)
    private String invoiceId;

    @Column(name = "OrderDetailID", length = 36)
    private String orderDetailId;

    @Column(name = "InvoiceNo", length = 100)
    private String invoiceNo;

    @Column(name = "MemberID", length = 36)
    private String memberId;

    @Column(name = "Status", nullable = false, columnDefinition = "INT DEFAULT 100")
    private Integer status;

    @Column(name = "IP", length = 255)
    private String ip;

    @Column(name = "TotalLP")
    private BigDecimal totalLp;

    @Column(name = "TotalAK")
    private BigDecimal totalAk;

    @Column(name = "TotalSP")
    private BigDecimal totalSp;


    @Column(name = "CreatedID", nullable = false, length = 36)
    private String createdId;

    @Column(name = "ModifiedID", length = 36)
    private String modifiedId;

    @CreationTimestamp
    @Column(name = "CreatedDateTime", nullable = false, updatable = false)
    private LocalDateTime createdDateTime;

    @UpdateTimestamp
    @Column(name = "ModifiedDateTime")
    private LocalDateTime modifiedDateTime;

    @Column(name = "DeleteYN", nullable = false, length = 1, columnDefinition = "'N'")
    private String deleteYn;

    @PrePersist
    public void perPersist(){

        if(this.createdDateTime == null) this.createdDateTime = LocalDateTime.now();
        if(this.modifiedDateTime == null) this.modifiedDateTime = LocalDateTime.now();

        if(this.deleteYn == null) this.deleteYn = "N";
    }
}
