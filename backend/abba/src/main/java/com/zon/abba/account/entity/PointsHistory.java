package com.zon.abba.account.entity;

import jakarta.persistence.*;
import lombok.*;

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
    private double lp;

    @Column(name = "LPBalance", precision = 10, scale = 2, nullable = false)
    private double lpBalance;

    @Column(name = "AK", precision = 10, scale = 2, nullable = false)
    private double ak;

    @Column(name = "AKBalance", precision = 10, scale = 2, nullable = false)
    private double akBalance;

    @Column(name = "SP", precision = 10, scale = 2, nullable = false)
    private double sp;

    @Column(name = "SPBalance", precision = 10, scale = 2, nullable = false)
    private double spBalance;

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

    @Column(name = "CreatedDateTime", nullable = false, updatable = false)
    private LocalDateTime createdDateTime;

    @Column(name = "ModifiedDateTime")
    private LocalDateTime modifiedDateTime;

    @Column(name = "DeleteYN", length = 1, nullable = false)
    private String deleteYn;
}