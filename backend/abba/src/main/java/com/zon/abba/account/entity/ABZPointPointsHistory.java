package com.zon.abba.account.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "ABZPointPointsHistory")
public class ABZPointPointsHistory {

    @Id
    @Column(name = "HistoryID", length = 36, nullable = false)
    private String historyId;

    @Column(name = "SenderWalletID", length = 36, nullable = false)
    private String senderWalletId;

    @Column(name = "ReceiverWalletID", length = 36, nullable = false)
    private String receiverWalletId;

    @Column(name = "Message", length = 255)
    private String message;

    @Column(name = "ABZPoint", precision = 10, scale = 2, nullable = false)
    private BigDecimal abzPoint;

    @Column(name = "ReceiverABZPointBalance", precision = 10, scale = 2, nullable = false)
    private BigDecimal receiverAbzPointBalance;

    @Column(name = "SenderABZPointBalance", precision = 10, scale = 2, nullable = false)
    private BigDecimal senderAbzPointBalance;

    @Column(name = "Status", length = 1, nullable = false, columnDefinition = "CHAR(1) DEFAULT 'p'")
    private String status;

    @Column(name = "Type", length = 1, nullable = false)
    private String type;

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
    public void perPersist() {

        if (this.createdDateTime == null) this.createdDateTime = LocalDateTime.now();
        if (this.modifiedDateTime == null) this.modifiedDateTime = LocalDateTime.now();

        if (this.deleteYn == null) this.deleteYn = "N";
    }
}
