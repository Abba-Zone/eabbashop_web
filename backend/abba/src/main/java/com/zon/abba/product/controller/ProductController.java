package com.zon.abba.product.controller;

import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.product.request.ProductListRequest;
import com.zon.abba.product.request.ProductRegisterRequest;
import com.zon.abba.product.request.UpdateYNRequest;
import com.zon.abba.product.response.DetailProductResponse;
import com.zon.abba.product.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
public class ProductController {
    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);
    private final ProductService productService;

    @PostMapping("/list/shop")
    @Operation(summary = "상품 내역 조회", description = "상품 내역을 볼 수 있다.")
    public ResponseEntity<Object> getProductShop(@RequestBody ProductListRequest request){
        ResponseListBody response = productService.listProductShop(request,"shop");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/list/admin")
    @Operation(summary = "상품 내역 조회", description = "상품 내역을 볼 수 있다.")
    public ResponseEntity<Object> getProductAdmin(@RequestBody ProductListRequest request){
        ResponseListBody response = productService.listProductShop(request,"admin");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/detail/{productId}")
    @Operation(summary = "상품 상세 조회", description = "특정 상품의 상세 정보를 조회합니다.")
    public ResponseEntity<Object> getProductDetail(@PathVariable String productId) {
        DetailProductResponse response = productService.getProductDetail(productId);

        return ResponseEntity.status(HttpStatus.OK).body(response);

    }

    @PostMapping("/register")
    @Operation(description = "상품 등록/수정", summary = "상품 등록/수정")
    public ResponseEntity<Object> registerBoard(@RequestBody ProductRegisterRequest registerProductRequest){
        ResponseBody response = productService.registerProduct(registerProductRequest);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 1. ShowYN 변경
    @PostMapping("/update-show-yn")
    @Operation(summary = "ShowYN 변경", description = "상품의 ShowYN 값을 변경합니다.")
    public ResponseEntity<ResponseBody> updateShowYN(@RequestBody UpdateYNRequest request) {
        ResponseBody response = productService.updateShowYN(request.getProductId(), request.getYN());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 2. DeleteYN 변경
    @PostMapping("/update-delete-yn")
    @Operation(summary = "DeleteYN 변경", description = "상품의 DeleteYN 값을 변경합니다.")
    public ResponseEntity<ResponseBody> updateDeleteYN(@RequestBody UpdateYNRequest request) {
        ResponseBody response = productService.updateDeleteYN(request.getProductId(), request.getYN());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 3. ActiveYN 변경
    @PostMapping("/update-active-yn")
    @Operation(summary = "ActiveYN 변경", description = "상품의 ActiveYN 값을 변경합니다.")
    public ResponseEntity<ResponseBody> updateActiveYN(@RequestBody UpdateYNRequest request) {
        ResponseBody response = productService.updateActiveYN(request.getProductId(), request.getYN());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
