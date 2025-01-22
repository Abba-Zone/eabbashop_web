package com.zon.abba.shipment.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "Shipment")
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Shipment {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "ShipmentID", columnDefinition = "CHAR(36)", nullable = false, updatable = false)
    private String shipmentId;

    @Column(name = "InvoiceID", nullable = true, length = 36)
    private String invoiceId;

    @Column(name = "Reference", nullable = true, length = 255)
    private String reference;

    @Column(name = "MemberID", nullable = true, length = 36)
    private String memberId;

    @Column(name = "ScheduledTime", nullable = true)
    private LocalDateTime scheduledTime;

    @Column(name = "CompletionTime", nullable = true)
    private LocalDateTime completionTime;

    @Column(name = "CreatedID", nullable = true, length = 36)
    private String createdId;

    @Column(name = "ModifiedID", nullable = true, length = 36)
    private String modifiedId;

    @CreationTimestamp
    @Column(name = "CreatedDateTime", nullable = false, updatable = false)
    private LocalDateTime createdDateTime;

    @UpdateTimestamp
    @Column(name = "ModifiedDateTime", nullable = true)
    private LocalDateTime modifiedDateTime;

    @Column(name = "DeleteYN", nullable = false, length = 1)
    private String deleteYN;

    @PrePersist
    public void perPersist(){
        if(this.createdDateTime == null) this.createdDateTime = LocalDateTime.now();
        if(this.modifiedDateTime == null) this.modifiedDateTime = LocalDateTime.now();

        if(this.deleteYN == null) this.deleteYN = "N";
    }
}
