package com.zon.abba.order.controller;

import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.order.request.RegisterOrderRequest;
import com.zon.abba.order.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
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

    

}
