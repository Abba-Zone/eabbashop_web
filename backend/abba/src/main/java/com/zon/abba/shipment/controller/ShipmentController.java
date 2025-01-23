package com.zon.abba.shipment.controller;

import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.shipment.request.RegisterShipmentRequest;
import com.zon.abba.shipment.request.ShipmentIdRequest;
import com.zon.abba.shipment.response.DetailShipmentResponse;
import com.zon.abba.shipment.service.ShipmentService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/shipment")
public class ShipmentController {
    private static final Logger logger = LoggerFactory.getLogger(ShipmentController.class);

    private final ShipmentService shipmentService;

    @PostMapping("/register")
    public ResponseEntity<Object> registerShipment(@RequestBody RegisterShipmentRequest request){

        ResponseBody response = shipmentService.registerShipment(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/detail")
    public ResponseEntity<Object> detailShipment(ShipmentIdRequest request){

        DetailShipmentResponse response = shipmentService.detailShipment(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/update")
    public ResponseEntity<Object> updateShipment()
}
