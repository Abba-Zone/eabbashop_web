package com.zon.abba.product.service;
import com.zon.abba.board.entity.Board;
import com.zon.abba.board.request.RegisterBoardRequest;
import com.zon.abba.board.response.DetailBoardResponse;
import com.zon.abba.category.entity.Category;
import com.zon.abba.category.repository.CategoryRepository;
import com.zon.abba.common.exception.NoDataException;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.member.entity.Member;
import com.zon.abba.product.dto.ProductDto;
import com.zon.abba.product.entity.Product;
import com.zon.abba.product.repository.ProductRepository;
import com.zon.abba.product.request.ProductListRequest;
import com.zon.abba.product.request.ProductRegisterRequest;
import com.zon.abba.product.response.DetailProductResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private static final Logger logger = LoggerFactory.getLogger(ProductService.class);

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Transactional
    public ResponseListBody listProduct(ProductListRequest request){

        //logger.info("상품 리스트를 가져옵니다.");

        List<Product> productList = productRepository.findBySellerIdAndViewSiteAndShowYNAndDeleteYNAndActiveYNAndAllowNationContaining(
                request.getSellerID(),request.getViewSite(),request.getShowYN(), request.getDeleteYN(), request.getActiveYN(), request.getNation());

        List<ProductDto> list =  new ArrayList<>();

        for(int i = 0 ; i < productList.size(); i++){
            list.add(new ProductDto(productList.get(i)));
        }

        return new ResponseListBody((long) productList.size(), productList);

    }

    public DetailProductResponse getProductDetail(String productId) {
        logger.info("상품 정보를 가져옵니다.");
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NoDataException("해당 상품을 찾을 수 없습니다. 상품 ID: " + productId));

        logger.info("상품 카테고리 정보를 가져옵니다.");
        Category category = categoryRepository.findByCategoryId(product.getCategoryId())
                .orElseThrow(() -> new NoMemberException("없는 카테고리입니다."));

        return new DetailProductResponse(product, category.getName());
    }

    @Transactional
    public ResponseBody registerProduct(ProductRegisterRequest registerProductRequest) {
        logger.info("상품을 등록합니다.");

        logger.info("유저 정보를 가져옵니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        String productId = registerProductRequest.getProductId(); // 요청에서 productId 가져오기

        if (productId != null && productRepository.existsByProductId(productId)) {
            // 상품이 존재하면 수정 로직 실행
            logger.info("상품이 이미 존재합니다. 수정 작업을 진행합니다.");
            Product existingProduct = productRepository.findById(productId)
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품입니다."));

            // 값이 있는 필드만 수정
            if (registerProductRequest.getName() != null) {
                existingProduct.setName(registerProductRequest.getName());
            }
            if (registerProductRequest.getCategoryId() != null) {
                existingProduct.setCategoryId(registerProductRequest.getCategoryId());
            }
            if (registerProductRequest.getTaxFreePrice() != null) {
                existingProduct.setTaxFreePrice(registerProductRequest.getTaxFreePrice());
            }
            if (registerProductRequest.getSpPrice() != null) {
                existingProduct.setSpPrice(registerProductRequest.getSpPrice());
            }
            if (registerProductRequest.getStock() != null) {
                existingProduct.setStock(registerProductRequest.getStock());
            }
            if (registerProductRequest.getRealPrice() != null) {
                existingProduct.setRealPrice(registerProductRequest.getRealPrice());
            }
            if (registerProductRequest.getThumbnail() != null) {
                existingProduct.setThumbnail(registerProductRequest.getThumbnail());
            }
            if (registerProductRequest.getDescription() != null) {
                existingProduct.setDescription(registerProductRequest.getDescription());
            }
            if (registerProductRequest.getSummary() != null) {
                existingProduct.setSummary(registerProductRequest.getSummary());
            }
            if (registerProductRequest.getPaybackRatio() != 0) {
                existingProduct.setPaybackRatio(registerProductRequest.getPaybackRatio());
            }
            if (registerProductRequest.getAllowNation() != null) {
                existingProduct.setAllowNation(registerProductRequest.getAllowNation());
            }
            if (registerProductRequest.getViewSite() != null) {
                existingProduct.setViewSite(registerProductRequest.getViewSite());
            }

            existingProduct.setModifiedId(memberId);
            existingProduct.setModifiedDateTime(LocalDateTime.now()); // 수정 시간 설정

            productRepository.save(existingProduct); // 수정된 상품 저장
            logger.info("상품 수정이 완료되었습니다.");
        } else {
            // 상품이 존재하지 않으면 기존 생성 로직 실행
            logger.info("상품 정보를 등록합니다.");
            Product product = Product.builder()
                    .sellerId(memberId)
                    .name(registerProductRequest.getName())
                    .categoryId(registerProductRequest.getCategoryId())
                    .taxFreePrice(registerProductRequest.getTaxFreePrice())
                    .spPrice(registerProductRequest.getSpPrice())
                    .stock(registerProductRequest.getStock())
                    .realPrice(registerProductRequest.getRealPrice())
                    .thumbnail(registerProductRequest.getThumbnail())
                    .description(registerProductRequest.getDescription())
                    .summary(registerProductRequest.getSummary())
                    .paybackRatio(registerProductRequest.getPaybackRatio())
                    .allowNation(registerProductRequest.getAllowNation())
                    .viewSite(registerProductRequest.getViewSite())
                    .createdId(memberId)
                    .modifiedId(memberId)
                    .createdDateTime(LocalDateTime.now()) // 현재 시간 설정
                    .modifiedDateTime(LocalDateTime.now()) // 현재 시간 설정
                    .build();

            productRepository.save(product); // 새로운 상품 저장
            logger.info("상품 등록을 완료했습니다.");
        }

        return new ResponseBody("성공했습니다.");
    }


    // 1. ShowYN 변경
    @Transactional
    public ResponseBody updateShowYN(String productId, String showYN) {

        logger.info("유저 정보를 가져옵니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품입니다."));
        product.setShowYN(showYN);
        product.setModifiedDateTime(LocalDateTime.now());
        product.setModifiedId(memberId);
        productRepository.save(product);
        logger.info("ShowYN 값이 변경되었습니다: {}", showYN);
        return new ResponseBody("ShowYN 값이 성공적으로 변경되었습니다.");
    }

    // 2. DeleteYN 변경
    @Transactional
    public ResponseBody updateDeleteYN(String productId, String deleteYN) {

        logger.info("유저 정보를 가져옵니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품입니다."));
        product.setDeleteYN(deleteYN);
        product.setModifiedDateTime(LocalDateTime.now());
        product.setModifiedId(memberId);
        productRepository.save(product);
        logger.info("DeleteYN 값이 변경되었습니다: {}", deleteYN);
        return new ResponseBody("DeleteYN 값이 성공적으로 변경되었습니다.");
    }

    // 3. ActiveYN 변경
    @Transactional
    public ResponseBody updateActiveYN(String productId, String activeYN) {

        logger.info("유저 정보를 가져옵니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 상품입니다."));
        product.setActiveYN(activeYN);
        product.setModifiedDateTime(LocalDateTime.now());
        product.setModifiedId(memberId);
        productRepository.save(product);
        logger.info("ActiveYN 값이 변경되었습니다: {}", activeYN);
        return new ResponseBody("ActiveYN 값이 성공적으로 변경되었습니다.");
    }

}
