package com.zon.abba.shipment.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateShipmentRequest {
    @JsonProperty("shipmentID")
    private String shipmentID;
    @JsonProperty("invoiceNo")
    private String invoiceNo;
    @JsonProperty("scheduledTime")
    private LocalDateTime scheduledTime;
    @JsonProperty("completionTime")
    private LocalDateTime completionTime;
    @JsonProperty("reference")
    private String reference;
}
