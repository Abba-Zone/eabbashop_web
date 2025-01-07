package com.zon.abba.cart.controller;

import com.zon.abba.cart.request.CartIdRequest;
import com.zon.abba.cart.request.RegisterCartRequest;
import com.zon.abba.cart.request.SelectCartRequest;
import com.zon.abba.cart.request.UpdateCartRequest;
import com.zon.abba.cart.service.CartService;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {
    private static final Logger logger = LoggerFactory.getLogger(CartController.class);

    private final CartService cartService;

    @PostMapping("/register")
    @Operation(summary = "장바구니 추가", description = "장바구니 추가하기")
    public ResponseEntity<Object> registerCart(@RequestBody RegisterCartRequest request){

        ResponseBody response = cartService.registerCart(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/update")
    @Operation(summary = "장바구니 개수 수정", description = "장바구니 물품 개수 수정할 때마다 호출")
    public ResponseEntity<Object> updateCart(@RequestBody UpdateCartRequest request){

        ResponseBody response = cartService.updateCart(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/select")
    @Operation(summary = "장바구니 선택 유무", description = "장바구니 물건 선택하거나 풀 때")
    public ResponseEntity<Object> selectCart(@RequestBody SelectCartRequest request){

        ResponseBody response = cartService.selectCart(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/list")
    @Operation(summary = "장바구니 조회", description = "현재 등록된 나의 장바구니 목록 확인")
    public ResponseEntity<Object> cartList(){

        ResponseListBody response = cartService.cartList();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/delete")
    @Operation(summary = "장바구니 삭제", description = "장바구니 목록 중 삭제")
    public ResponseEntity<Object> deleteCart(@RequestBody CartIdRequest request){

        ResponseBody response = cartService.deleteCart(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
