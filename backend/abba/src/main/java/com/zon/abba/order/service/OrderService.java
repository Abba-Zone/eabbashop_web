package com.zon.abba.order.service;

import com.zon.abba.address.entity.Address;
import com.zon.abba.address.repository.AddressRepository;
import com.zon.abba.common.exception.NoDataException;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.request.RequestList;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.order.dto.OrderAdminDto;
import com.zon.abba.order.dto.OrderDetailDto;
import com.zon.abba.order.dto.OrderDto;
import com.zon.abba.order.dto.ProductDto;
import com.zon.abba.order.entity.Orders;
import com.zon.abba.order.entity.OrderDetail;
import com.zon.abba.order.mapping.OrderList;
import com.zon.abba.order.mapping.OrderedProduct;
import com.zon.abba.order.repository.OrderDetailRepository;
import com.zon.abba.order.repository.OrderRepository;
import com.zon.abba.order.request.OrderDetailIdRequest;
import com.zon.abba.order.request.RegisterOrderRequest;
import com.zon.abba.product.entity.Product;
import com.zon.abba.product.repository.ProductRepository;
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
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);

    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final AddressRepository addressRepository;
    private final ProductRepository productRepository;
    private final JwtTokenProvider jwtTokenProvider;


    @Transactional
    public ResponseBody registerOrder(RegisterOrderRequest request){
        logger.info("주문 내역을 등록합니다.");
        // 1. order 객체 만들고
        // 2. 각 상품별 orderDetail 객체 만들기

        logger.info("유저 정보를 가져옵니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        logger.info("주문자의 주소 정보를 가져옵니다.");
        Address address = addressRepository.findByAddressId(request.getAddressId())
                .orElseThrow(() -> new NoDataException("없는 고객 주소입니다."));

        logger.info("청구지의 주소 정보를 가져옵니다.");
        Address billAddress = addressRepository.findByAddressId(request.getBillAddressId())
                .orElseThrow(() -> new NoDataException("없는 청구지 주소입니다."));

        // 1. 1차 order 객체 생성
        Orders orders = Orders.builder()
                .memberId(memberId)
                .lpPrice(new BigDecimal("0.0"))
                .akPrice(new BigDecimal("0.0"))
                .spPrice(new BigDecimal("0.0"))
                .donationRate(new BigDecimal("0.0"))
                .zipCode(address.getZipCode())
                .baseAddress(address.getBaseAddress())
                .detailAddress(address.getDetailAddress())
                .billZipCode(billAddress.getZipCode())
                .billBaseAddress(billAddress.getBaseAddress())
                .billDetailAddress(billAddress.getDetailAddress())
                .build();

        orderRepository.save(orders);


        // 총 금액 계산 하고 나머지 입력
        BigDecimal LP = new BigDecimal("0.0");
        BigDecimal AK = new BigDecimal("0.0");
        BigDecimal SP = new BigDecimal("0.0");

        List<String> productIds = request.getProducts().stream().map(ProductDto::getProductId).toList();

        List<Product> products = productRepository.findByProductIds(productIds);

        List<OrderDetail> orderDetails = new ArrayList<>();
        for (Product product : products){
            // 주문 개수 구하기
            Integer quantity = request.getProducts().stream()
                    .filter(p -> p.getProductId().equals(product.getProductId()))
                    .map(ProductDto::getQuantity)
                    .findFirst()
                    .orElse(0);

            LP = LP.add(product.getTaxFreePrice());
            SP = SP.add(product.getSpPrice());
            // AK 로직 작성 후 집어넣기

            // 객체 만들기
            OrderDetail orderDetail = OrderDetail.builder()
                    .orderId(orders.getOrderId())
                    .memberId(memberId)
                    .productId(product.getProductId())
                    .quantity(quantity)
                    .status(100)
                    .lpPrice(product.getTaxFreePrice())
                    .spPrice(product.getSpPrice())
                    .akPrice(BigDecimal.valueOf(0.0))
                    .build();

            orderDetails.add(orderDetail);
        }

        logger.info("연산 결과를 db에 저장합니다.");

        // 계산된 금액 order에 넣기
        orders.setLpPrice(LP);
        orders.setSpPrice(SP);
        // AK 자리

        // orderDetail 넣기
        orderDetailRepository.saveAll(orderDetails);

        logger.info("주문하기가 완료되었습니다.");
        return new ResponseBody("성공했습니다.");
    }

    @Transactional
    public ResponseListBody orderList(RequestList requestList, String year){
        logger.info("주문 내역을 가져옵니다.");

        logger.info("확인할 유저 정보를 가져옵니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        // 최신순 정렬 추가
        Pageable pageable = PageRequest.of(
                requestList.getPageNo(),
                requestList.getPageSize(),
                Sort.by(Sort.Direction.DESC, "createdDateTime"));

        // member에 맞는 order 데이터 가져오기
        Page<Orders> orders = orderRepository.findByMemberIdAndYearPaged(memberId, "N", year, pageable);

        List<OrderDto> list = orders.stream()
                .map(order -> {
                    OrderDto orderDto = new OrderDto();
                    orderDto.setOrderId(order.getOrderId());
                    orderDto.setCreatedDateTime(order.getCreatedDateTime());

                    // orderDetail 가져오기
                    List<OrderedProduct> ops = orderDetailRepository.findOrderedProductsByOrderId(order.getOrderId());
                    List<OrderDetailDto> orderDetails = ops.stream()
                            .map(OrderDetailDto::new)
                            .toList();

                    orderDto.setOrderDetails(orderDetails);

                    return orderDto;
                })
                .toList();

        logger.info("고객 주문 내역 반환 완료");
        return new ResponseListBody(orders.getTotalElements(), list);

    }

    @Transactional
    public ResponseListBody orderAdminList(RequestList requestList){
        logger.info("관리자용 주문 내역을 가져옵니다.");

        // 최신순 정렬 추가
        Pageable pageable = PageRequest.of(
                requestList.getPageNo(),
                requestList.getPageSize(),
                Sort.by(requestList.getSort().equals("ASC") ?
                                Sort.Direction.ASC : Sort.Direction.DESC,
                        requestList.getSortValue()));

        // member에 맞는 order 데이터 가져오기
        Page<OrderList> orderListPage = orderDetailRepository.findOrderListByFilter(
                requestList.getFilter(),
                requestList.getFilterValue(),
                pageable);

        List<OrderAdminDto> list = orderListPage.stream()
                .map(OrderAdminDto::new)
                .toList();

        logger.info("관리자 주문 내역 반환 완료");
        return new ResponseListBody(orderListPage.getTotalElements(), list);

    }

    @Transactional
    public ResponseBody cancelOrder(List<OrderDetailIdRequest> request){
        logger.info("주문을 취소합니다.");

        List<String> ids = request.stream()
                .map(OrderDetailIdRequest::getOrderDetailID)
                .toList();
        List<OrderDetail> list = orderDetailRepository.findByOrderDetailIds(ids);

        // 400 : 취소
        list.forEach(od -> od.setStatus(400));

        // 업데이트 내용 저장
        orderDetailRepository.saveAll(list);

        logger.info("주문 취소 처리가 완료되었습니다.");
        return new ResponseBody("성공했습니다.");
    }
}
