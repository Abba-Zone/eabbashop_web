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

    @Column(name = "SenderWalletID", length = 36)
    private String senderWalletId;

    @Column(name = "ReceiverWalletID", length = 36)
    private String receiverWalletId;

    @Column(name = "Message", length = 255)
    private String message;

    @Column(name = "LP", precision = 10, scale = 2, nullable = false)
    private BigDecimal lp;

    @Column(name = "SenderLPBalance", precision = 10, scale = 2, nullable = false)
    private BigDecimal senderLpBalance;

    @Column(name = "ReceiverLPBalance", precision = 10, scale = 2, nullable = false)
    private BigDecimal receiverLpBalance;

    @Column(name = "AK", precision = 10, scale = 2, nullable = false)
    private BigDecimal ak;

    @Column(name = "SenderAKBalance", precision = 10, scale = 2, nullable = false)
    private BigDecimal senderAkBalance;

    @Column(name = "ReceiverAKBalance", precision = 10, scale = 2, nullable = false)
    private BigDecimal receiverAkBalance;

    @Column(name = "SP", precision = 10, scale = 2, nullable = false)
    private BigDecimal sp;

    @Column(name = "SenderSPBalance", precision = 10, scale = 2, nullable = false)
    private BigDecimal senderSpBalance;

    @Column(name = "ReceiverSPBalance", precision = 10, scale = 2, nullable = false)
    private BigDecimal receiverSpBalance;

    @Column(name = "Status", length = 1, nullable = false)
    private String status;

    @Column(name = "Type", length = 1)
    private String type;

    @Column(name = "OrderDetailID", length = 36)
    private String orderDetailId;

    @Column(name = "ChargeRefundID", length = 36)
    private String chargeRefundId;

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