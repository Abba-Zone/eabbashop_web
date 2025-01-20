package com.zon.abba.invoice.service;

import com.zon.abba.common.exception.InvalidException;
import com.zon.abba.common.exception.NoDataException;
import com.zon.abba.common.request.RequestList;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.invoice.dto.InvoiceListDto;
import com.zon.abba.invoice.entity.Invoice;
import com.zon.abba.invoice.mapping.InvoiceList;
import com.zon.abba.invoice.repository.InvoiceRepository;
import com.zon.abba.invoice.request.InvoiceIdRequest;
import com.zon.abba.invoice.request.RegisterInvoiceRequest;
import com.zon.abba.invoice.response.InvoiceDetailResponse;
import com.zon.abba.order.entity.OrderDetail;
import com.zon.abba.order.entity.Orders;
import com.zon.abba.order.repository.OrderDetailRepository;
import com.zon.abba.order.repository.OrderRepository;
import com.zon.abba.order.request.OrderDetailIdRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.StringTokenizer;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private static final Logger logger = LoggerFactory.getLogger(InvoiceService.class);

    private final InvoiceRepository invoiceRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final OrderRepository orderRepository;

    public boolean areAllOrderIdsSame(List<OrderDetail> orderDetails) {
        // Stream을 사용하여 모든 OrderID가 동일한지 확인
        return orderDetails.stream()
                .map(OrderDetail::getOrderId) // OrderID만 추출
                .distinct() // 중복 제거
                .count() == 1; // 고유 OrderID가 하나만 있어야 true
    }

    @Transactional
    public ResponseBody registerInvoice(RegisterInvoiceRequest request){
        logger.info("새로운 송장을 등록합니다.");
        // 들어온 OrderDetailID들이 같은 OrderID를 가지는지 체크하자.
        List<String> orderDetailIds = request.getOrderDetails().stream()
                .map(OrderDetailIdRequest::getOrderDetailID)
                .toList();

        logger.info("주문 목록을 불러옵니다.");
        List<OrderDetail> orderDetails = orderDetailRepository.findByOrderDetailIds(orderDetailIds);

        // 같은 주문인것만 처리 아니면 넘기기
        if(!areAllOrderIdsSame(orderDetails)) throw new InvalidException("같은 주문이 아닙니다.");

        // orderDetails 하나의 String으로 만들기
        // 송장에 넣을 데이터 만들기
        String joinedOrderDetailIds = String.join(",", orderDetailIds);

        BigDecimal totalLp = orderDetails.stream()
                .map(OrderDetail::getLpPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalAk = orderDetails.stream()
                .map(OrderDetail::getAkPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalSp = orderDetails.stream()
                .map(OrderDetail::getSpPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        logger.info("송장 정보를 등록합니다.");
        Invoice invoice = Invoice.builder()
                .invoiceNo(request.getInvoiceNo())
                .memberId(orderDetails.get(0).getMemberId())
                .orderDetailId(joinedOrderDetailIds)
                .ip(request.getIP())
                .status(100)
                .totalLp(totalLp)
                .totalAk(totalAk)
                .totalSp(totalSp)
                .build();

        invoiceRepository.save(invoice);

        logger.info("등록된 주문 목록의 상태를 변경합니다.");
        orderDetails.forEach(od -> od.setStatus(200));
        orderDetailRepository.saveAll(orderDetails);

        logger.info("송장 등록을 완료했습니다.");
        return new ResponseBody("성공했습니다.");
    }

    @Transactional
    public ResponseListBody invoiceList(RequestList request){
        // 주문 아이디 어떻게 할지 이야기 해보기
        Pageable pageable = PageRequest.of(
                request.getPageNo(),
                request.getPageSize(),
                Sort.by(request.getSort().equals("ASC") ?
                                Sort.Direction.ASC : Sort.Direction.DESC,
                        request.getSortValue())
        );

        logger.info("송장 정보를 가져옵니다.");
        Page<InvoiceList> pages = invoiceRepository.findFilteredInvoices(request.getFilter(), request.getFilterValue(), pageable);
        List<InvoiceListDto> list = pages.stream()
                .map(InvoiceListDto::new)
                .toList();

        return new ResponseListBody(pages.getTotalElements(), list);
    }

    @Transactional
    public InvoiceDetailResponse detailInvoice(InvoiceIdRequest request){
        return null;
    }
}
