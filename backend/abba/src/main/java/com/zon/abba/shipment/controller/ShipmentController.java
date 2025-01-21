package com.zon.abba.shipment.controller;

import com.zon.abba.shipment.request.RegisterShipmentRequest;
import com.zon.abba.shipment.service.ShipmentService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/shipment")
public class ShipmentController {
    private static final Logger logger = LoggerFactory.getLogger(ShipmentController.class);

    private final ShipmentService shipmentService;

    @PostMapping("/register")
    public ResponseEntity<Object> registerShipment(@RequestBody RegisterShipmentRequest request){

        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}
