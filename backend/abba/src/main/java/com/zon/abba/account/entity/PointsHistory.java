package com.zon.abba.account.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "PointsHistory")
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PointsHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "HistoryID", nullable = false, updatable = false, length = 36)
    private String historyId;

    @Column(name = "MemberID", length = 36)
    private String memberId;

    @Column(name = "Message", length = 255)
    private String message;

    @Column(name = "LP", precision = 10, scale = 2, nullable = false)
    private BigDecimal lp;

    @Column(name = "LPBalance", precision = 10, scale = 2, nullable = false)
    private BigDecimal lpBalance;

    @Column(name = "AK", precision = 10, scale = 2, nullable = false)
    private BigDecimal ak;

    @Column(name = "AKBalance", precision = 10, scale = 2, nullable = false)
    private BigDecimal akBalance;

    @Column(name = "SP", precision = 10, scale = 2, nullable = false)
    private BigDecimal sp;

    @Column(name = "SPBalance", precision = 10, scale = 2, nullable = false)
    private BigDecimal spBalance;

    @Column(name = "Type", length = 1)
    private String type;

    @Column(name = "OrderDetailID", length = 36)
    private String orderDetailId;

    @Column(name = "ChargeRefundID", length = 36)
    private String chargeRefundId;

    @Column(name = "TransferID", length = 36)
    private String transferId;

    @Column(name = "CreatedID", length = 36)
    private String createdId;

    @Column(name = "ModifiedID", length = 36)
    private String modifiedId;

    @CreationTimestamp
    @Column(name = "CreatedDateTime", nullable = false, updatable = false)
    private LocalDateTime createdDateTime;

    @UpdateTimestamp
    @Column(name = "ModifiedDateTime")
    private LocalDateTime modifiedDateTime;

    @Column(name = "DeleteYN", length = 1, nullable = false)
    private String deleteYn;

    @PrePersist
    public void perPersist(){

        if(this.createdDateTime == null) this.createdDateTime = LocalDateTime.now();
        if(this.modifiedDateTime == null) this.modifiedDateTime = LocalDateTime.now();

        if(this.deleteYn == null) this.deleteYn = "N";
    }
}