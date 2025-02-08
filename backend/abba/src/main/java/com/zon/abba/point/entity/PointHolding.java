package com.zon.abba.point.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "PointHolding")
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PointHolding {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "HoldingID", nullable = false, updatable = false, length = 36)
    private String holdingId;

    @Column(name = "MemberID", length = 36, nullable = false)
    private String memberId;

    @Column(name = "OrderDetailID", length = 36)
    private String orderDetailId;

    @Column(name = "LP", precision = 10, scale = 2, nullable = false)
    private BigDecimal lp;

    @Column(name = "AK", precision = 10, scale = 2, nullable = false)
    private BigDecimal ak;

    @Column(name = "SP", precision = 10, scale = 2, nullable = false)
    private BigDecimal sp;

    @Column(name = "Type", length = 1, nullable = false)
    private String type;

    @Column(name = "Status", length = 1, nullable = false)
    private String status;

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

    @PrePersist
    public void prePersist() {

        if (this.createdDateTime == null) this.createdDateTime = LocalDateTime.now();
        if (this.modifiedDateTime == null) this.modifiedDateTime = LocalDateTime.now();

        if (this.deleteYn == null) this.deleteYn = "N";
    }
}
