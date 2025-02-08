package com.zon.abba.point.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "ChargeRefund")
@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChargeRefund {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "ChargeRefundID", nullable = false, updatable = false, length = 36)
    private String chargeRefundId;

    @Column(name = "SenderWalletID", length = 36)
    private String senderWalletId;

    @Column(name = "ReceiverWalletID", length = 36)
    private String receiverWalletId;

    @Column(name = "AccountID", length = 36, nullable = false)
    private String accountId;

    @Column(name = "LP", precision = 10, scale = 2, nullable = false)
    private BigDecimal lp;

    @Column(name = "AK", precision = 10, scale = 2, nullable = false)
    private BigDecimal ak;

    @Column(name = "SP", precision = 10, scale = 2, nullable = false)
    private BigDecimal sp;

    @Column(name = "ABZPoint", precision = 10, scale = 2, nullable = false)
    private BigDecimal abzPoint;

    @Column(name = "Status", length = 1, nullable = false)
    private String status;

    @Column(name = "CreatedID", length = 36, nullable = false)
    private String createdId;

    @Column(name = "ModifiedID", length = 36)
    private String modifiedId;

    @CreationTimestamp
    @Column(name = "CreatedDateTime", updatable = false)
    private LocalDateTime createdDateTime;

    @UpdateTimestamp
    @Column(name = "ModifiedDateTime")
    private LocalDateTime modifiedDateTime;

    @Column(name = "DeleteYN", length = 1, nullable = false)
    private String deleteYn;

    @PrePersist
    public void prePersist() {

        if (this.createdDateTime == null) this.createdDateTime = LocalDateTime.now();
        if (this.modifiedDateTime == null) this.modifiedDateTime = LocalDateTime.now();

        if (this.deleteYn == null) this.deleteYn = "N";
    }
}
