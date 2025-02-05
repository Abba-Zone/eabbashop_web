package com.zon.abba.point.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "PointHolding")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PointHolding {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "HoldingID", columnDefinition = "CHAR(36)", updatable = false, nullable = false)
    private String holdingId;

    @Column(name = "MemberID", columnDefinition = "CHAR(36)", nullable = false)
    private String memberId;

    @Column(name = "OrderDetailID", columnDefinition = "CHAR(36)")
    private String orderDetailId;

    @Column(name = "LP", precision = 10, scale = 2, nullable = false)
    private BigDecimal lp = BigDecimal.ZERO;

    @Column(name = "AK", precision = 10, scale = 2, nullable = false)
    private BigDecimal ak = BigDecimal.ZERO;

    @Column(name = "SP", precision = 10, scale = 2, nullable = false)
    private BigDecimal sp = BigDecimal.ZERO;

    @Column(name = "Type", columnDefinition = "CHAR(1)", nullable = false)
    private String type;

    @Column(name = "Status", columnDefinition = "CHAR(1)", nullable = false, length = 1)
    private String status = "A";

    @Column(name = "CreatedID", columnDefinition = "CHAR(36)", nullable = false)
    private String createdId;

    @Column(name = "ModifiedID", columnDefinition = "CHAR(36)", nullable = false)
    private String modifiedId;

    @CreationTimestamp
    @Column(name = "CreatedDateTime", nullable = false, updatable = false)
    private LocalDateTime createdDateTime;

    @UpdateTimestamp
    @Column(name = "ModifiedDateTime", nullable = false)
    private LocalDateTime modifiedDateTime;

    @Column(name = "DeleteYN", columnDefinition = "CHAR(1)", nullable = false)
    private String deleteYn = "N";
}
