package com.zon.abba.shipment.dto;

import com.zon.abba.shipment.mapping.ShipmentList;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ShipmentListDto {
    private String shipmentID;
    private String invoiceNo;
    private String name;
    private LocalDateTime scheduledTime;
    private LocalDateTime createdDateTime;

    public ShipmentListDto(ShipmentList shipmentList){
        this.shipmentID = shipmentList.getShipmentId();
        this.invoiceNo = shipmentList.getInvoiceNo();
        this.name = shipmentList.getName();
        this.scheduledTime = shipmentList.getScheduledTime();
        this.createdDateTime = shipmentList.getCreatedDateTime();
    }
}
