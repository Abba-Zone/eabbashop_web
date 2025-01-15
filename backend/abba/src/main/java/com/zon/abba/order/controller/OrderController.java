package com.zon.abba.order.controller;

import com.zon.abba.common.request.RequestList;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.order.request.*;
import com.zon.abba.order.response.DetailAdminOrderResponse;
import com.zon.abba.order.response.DetailOrderResponse;
import com.zon.abba.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/order")
public class OrderController {
    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);
    private final OrderService orderService;

    @PostMapping("/register")
    @Operation(summary = "주문하기", description = "다양한 상품을 주문할 수 있다.")
    public ResponseEntity<Object> registerOrder(@RequestBody RegisterOrderRequest request){

        ResponseBody response = orderService.registerOrder(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/list")
    @Operation(summary = "고객 주문 조회", description = "고객이 자신의 주문 내역 리스트를 볼 수 있다.")
    public ResponseEntity<Object> orderList(@ModelAttribute RequestList requestList,
                                            @RequestParam(value = "year", required = false) String year){

        ResponseListBody response = orderService.orderList(requestList, year);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/list/admin")
    @Operation(summary = "고객 주문 조회", description = "고객이 자신의 주문 내역 리스트를 볼 수 있다.")
    public ResponseEntity<Object> orderAdminList(@ModelAttribute RequestList requestList){

        ResponseListBody response = orderService.orderAdminList(requestList);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/list/change/status")
    @Operation(summary = "주문 리스트 상태 바꾸기", description = "여러개의 주문 내역의 상태를 바꿀 수 있다.")
    public ResponseEntity<Object> cancelOrder(@RequestBody ChangeStatusListRequest request){

        ResponseBody response = orderService.changeOrderListStatus(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/change/status")
    @Operation(summary = "하나의 주문 상태 바꾸기", description = "하나의 주문 내역의 상태를 바꿀 수 있다.")
    public ResponseEntity<Object> confirmOrder(@RequestBody ChangeStatusRequest request){

        ResponseBody response = orderService.changeOrderStatus(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/delete")
    @Operation(summary = "주문 내역 삭제", description = "주문 내역을 삭제할 수 있다.")
    public ResponseEntity<Object> deleteOrder(@RequestBody List<OrderDetailIdRequest> request){

        ResponseBody response = orderService.deleteOrder(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/detail")
    @Operation(summary = "고객 주문 상세", description = "고객이 자신의 주문 내역 상세를 볼 수 있다.")
    public ResponseEntity<Object> detailOrder(OrderIdRequest request){

        DetailOrderResponse response = orderService.detailOrder(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    @GetMapping("/detail/admin")
    @Operation(summary = "관리자 주문 조회", description = "관리자가 고객의 주문 내역 상세를 볼 수 있다.")
    public ResponseEntity<Object> detailAdminOrder(OrderDetailIdRequest request){

        DetailAdminOrderResponse response = orderService.detailAdminOrder(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
