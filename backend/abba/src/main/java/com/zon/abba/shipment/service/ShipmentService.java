package com.zon.abba.shipment.service;

import com.zon.abba.common.exception.NoDataException;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.invoice.dto.AddressDto;
import com.zon.abba.invoice.dto.MemberDto;
import com.zon.abba.invoice.dto.ProductDto;
import com.zon.abba.invoice.entity.Invoice;
import com.zon.abba.invoice.repository.InvoiceRepository;
import com.zon.abba.member.entity.Member;
import com.zon.abba.member.repository.MemberRepository;
import com.zon.abba.order.entity.Orders;
import com.zon.abba.order.mapping.OrderedProduct;
import com.zon.abba.order.repository.OrderDetailRepository;
import com.zon.abba.order.repository.OrderRepository;
import com.zon.abba.shipment.entity.Shipment;
import com.zon.abba.shipment.repository.ShipmentRepository;
import com.zon.abba.shipment.request.RegisterShipmentRequest;
import com.zon.abba.shipment.request.ShipmentIdRequest;
import com.zon.abba.shipment.request.UpdateShipmentRequest;
import com.zon.abba.shipment.response.DetailShipmentResponse;
import jakarta.persistence.Table;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ShipmentService {
    private static final Logger logger = LoggerFactory.getLogger(ShipmentService.class);

    private final ShipmentRepository shipmentRepository;
    private final InvoiceRepository invoiceRepository;
    private final MemberRepository memberRepository;
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
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

    @Transactional
    public DetailShipmentResponse detailShipment(ShipmentIdRequest request){
        logger.info("출하 상세 정보를 가져옵니다.");
        Shipment shipment = shipmentRepository.findById(request.getShipmentID())
                .orElseThrow(() -> new NoDataException("없는 출하 정보입니다."));

        Invoice invoice = invoiceRepository.findById(shipment.getInvoiceId())
                .orElseThrow(() -> new NoDataException("없는 송장 정보입니다."));

        logger.info("회원 정보를 가져옵니다.");
        Member member = memberRepository.findOneByMemberId(invoice.getMemberId())
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        MemberDto memberDto = new MemberDto(member);

        logger.info("주문 정보를 가져옵니다.");
        List<String> orderDetailId = Arrays.stream(invoice.getOrderDetailId().split(",")).toList();

        Orders orders = orderRepository.findOrderByOrderDetailID(orderDetailId.get(0))
                .orElseThrow(() -> new NoDataException("없는 주문 정보입니다."));

        AddressDto shippingAddress = AddressDto.builder()
                .zipCode(orders.getZipCode())
                .baseAddress(orders.getBaseAddress())
                .detailAddress(orders.getDetailAddress())
                .name(orders.getLastName() + " " + orders.getFirstName())
                .phone(orders.getPhone())
                .comment(orders.getComment())
                .build();

        AddressDto billAddress = AddressDto.builder()
                .zipCode(orders.getBillZipCode())
                .baseAddress(orders.getBillBaseAddress())
                .detailAddress(orders.getBillDetailAddress())
                .name(orders.getBillLastName() + " " + orders.getBillFirstName())
                .phone(orders.getBillPhone())
                .comment(orders.getBillComment())
                .build();

        logger.info("상품 정보를 가져옵니다.");
        List<OrderedProduct> products = orderDetailRepository.findOrderedProductsByOrderDetailIds(orderDetailId);

        List<ProductDto> productDtos = products.stream()
                .map(ProductDto::new)
                .toList();

        logger.info("출하 정보를 반환합니다.");

        return new DetailShipmentResponse(
                shipment.getShipmentId(),
                invoice.getInvoiceNo(),
                shipment.getCreatedDateTime(),
                shipment.getScheduledTime(),
                shipment.getCompletionTime(),
                shipment.getReference(),
                invoice.getIp(),
                productDtos,
                memberDto,
                billAddress,
                shippingAddress
        );

    }

    @Transactional
    public ResponseBody updateShipment(UpdateShipmentRequest request){

        return new ResponseBody("성공했습니다.");
    }
}
