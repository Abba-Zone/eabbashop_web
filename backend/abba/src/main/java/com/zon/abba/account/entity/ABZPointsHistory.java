package com.zon.abba.account.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Entity
@Table(name = "ABZPointsHistory")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ABZPointsHistory {

    @Id
    @Column(name = "HistoryID", length = 36, nullable = false)
    private String historyId;

    @Column(name = "SenderWalletID", length = 36, nullable = false)
    private String senderWalletId;

    @Column(name = "ReceiverWalletID", length = 36, nullable = false)
    private String receiverWalletId;

    @Column(name = "Message", length = 255)
    private String message;

    @Column(name = "ABZ", precision = 10, scale = 2, nullable = false)
    private BigDecimal abz;

    @Column(name = "ReceiverABZBalance", precision = 10, scale = 2, nullable = false)
    private BigDecimal receiverAbzBalance;

    @Column(name = "SenderABZBalance", precision = 10, scale = 2, nullable = false)
    private BigDecimal senderAbzBalance;

    @Column(name = "Status", length = 1, nullable = false, columnDefinition = "CHAR(1) DEFAULT 'p'")
    private String status;

    @Column(name = "Type", length = 1, nullable = false)
    private String type;

    @Column(name = "CreatedID", length = 36)
    private String createdId;

    @Column(name = "ModifiedID", length = 36)
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

        if (this.createdId == null) this.createdId = UUID.randomUUID().toString();
        if (this.modifiedId == null) this.modifiedId = UUID.randomUUID().toString();

        if (this.createdDateTime == null) this.createdDateTime = LocalDateTime.now();
        if (this.modifiedDateTime == null) this.modifiedDateTime = LocalDateTime.now();

        if (this.deleteYn == null) this.deleteYn = "N";
    }
}
