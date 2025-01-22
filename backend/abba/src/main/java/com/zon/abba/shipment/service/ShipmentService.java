package com.zon.abba.shipment.service;

import com.zon.abba.common.exception.NoDataException;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.invoice.entity.Invoice;
import com.zon.abba.invoice.repository.InvoiceRepository;
import com.zon.abba.shipment.entity.Shipment;
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
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public ResponseBody registerShipment(RegisterShipmentRequest request){

        logger.info("출하 정보를 등록합니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        Invoice invoice = invoiceRepository.findById(request.getInvoiceID())
                .orElseThrow(() -> new NoDataException("없는 송장 정보입니다."));

        Shipment shipment = Shipment.builder()
                .invoiceId(request.getInvoiceID())
                .reference(request.getReference())
                .memberId(invoice.getMemberId())
                .scheduledTime(request.getScheduledTime())
                .createdId(memberId)
                .modifiedId(memberId)
                .build();

        shipmentRepository.save(shipment);

        logger.info("출하 등록에 성공했습니다.");

        return new ResponseBody("성공했습니다.");
    }
}
