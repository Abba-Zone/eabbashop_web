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
public class RegisterShipmentRequest {
    @JsonProperty("invoiceID")
    private String invoiceID;
    @JsonProperty("reference")
    private String reference;
    @JsonProperty("scheduledTime")
    private LocalDateTime scheduledTime;
}
