package com.zon.abba.shipment.service;

import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.invoice.repository.InvoiceRepository;
import com.zon.abba.shipment.repository.ShipmentRepository;
import com.zon.abba.shipment.request.RegisterShipmentRequest;
import jakarta.persistence.Table;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ShipmentService {
    private static final Logger logger = LoggerFactory.getLogger(ShipmentService.class);

    private final ShipmentRepository shipmentRepository;
    private final InvoiceRepository invoiceRepository;

    @Transactional
    public ResponseBody registerShipment(RegisterShipmentRequest request){

        logger.info("송장 정보를 가져옵니다.");


        return new ResponseBody("성공했습니다.");
    }
}
