package com.zon.abba.product.controller;

import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseDataBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.product.request.*;
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

    // 상품평 등록
    @PostMapping("/review/register")
    @Operation(summary = "상품평 등록", description = "상품평 등록.")
    public ResponseEntity<ResponseDataBody> productReviewRegister(@RequestBody ProductReviewRequest request) {
        ResponseDataBody response = productService.productReviewRegister(request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    // 상품평 수정
    @PostMapping("/review/modify")
    @Operation(summary = "상품평 수정", description = "상품평 수정.")
    public ResponseEntity<ResponseDataBody> productReviewModify(@RequestBody ProductReviewModifyRequest request) {
        ResponseDataBody response = productService.productReviewModify(request);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 상품평 삭제
    @DeleteMapping("/review/delete/{prodcutReviewID}")
    @Operation(summary = "상품평 삭제", description = "상품평 삭제")
    public ResponseEntity<ResponseBody> productReviewDelete(@PathVariable String prodcutReviewID) {
        ResponseBody response = productService.productReviewDelete(prodcutReviewID);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 상품평 좋아요
    @PostMapping("/review/like/{prodcutReviewID}")
    @Operation(summary = "상품평 좋아요", description = "상품평 좋아요")
    public ResponseEntity<ResponseBody> productReviewLike(@PathVariable String prodcutReviewID) {
        ResponseBody response = productService.productReviewLikeDislike(prodcutReviewID,"like");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 상품평 싫어요
    @PostMapping("/review/dislike/{prodcutReviewID}")
    @Operation(summary = "상품평 dislike", description = "dislike 조회")
    public ResponseEntity<ResponseBody> productReviewDislike(@PathVariable String prodcutReviewID) {
        ResponseBody response = productService.productReviewLikeDislike(prodcutReviewID,"dislike");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 상품평 조회
    @GetMapping("/review/{prodcutReviewID}")
    @Operation(summary = "상품평 조회", description = "상품평 조회")
    public ResponseEntity<ResponseDataBody> productReview(@PathVariable String prodcutReviewID) {
        ResponseDataBody response = productService.ProductReviewDetail(prodcutReviewID);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // 상품평 조회
    @GetMapping("/review/list/{productID}")
    @Operation(summary = "상품평 조회", description = "상품평 조회")
    public ResponseEntity<ResponseListBody> productReviewList(@PathVariable String productID) {
        ResponseListBody response = productService.ProductReviewList(productID);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    // 상품평 조회
    @GetMapping("/review/list/my")
    @Operation(summary = "상품평 조회", description = "상품평 조회")
    public ResponseEntity<ResponseListBody> productReviewList() {
        ResponseListBody response = productService.ProductReviewList("my");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
