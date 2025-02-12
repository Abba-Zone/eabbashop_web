package com.zon.abba.product.service;
import com.zon.abba.category.entity.Category;
import com.zon.abba.category.repository.CategoryRepository;
import com.zon.abba.common.exception.NoDataException;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.member.entity.Member;
import com.zon.abba.member.entity.Seller;
import com.zon.abba.member.repository.MemberRepository;
import com.zon.abba.member.repository.SellerRepository;
import com.zon.abba.product.dto.ProductDto;
import com.zon.abba.product.entity.Product;
import com.zon.abba.product.entity.ProductReview;
import com.zon.abba.product.repository.ProductRepository;
import com.zon.abba.product.repository.ProductReviewRepository;
import com.zon.abba.product.request.ProductListRequest;
import com.zon.abba.product.request.ProductRegisterRequest;
import com.zon.abba.product.response.DetailProductResponse;
import com.zon.abba.product.response.ProductListResponseAdmin;
import com.zon.abba.product.response.ProductListResponseShop;
import com.zon.abba.wishlist.repository.WishlistRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.OptionalDouble;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;

@Service
@RequiredArgsConstructor
public class ProductService {
    private static final Logger logger = LoggerFactory.getLogger(ProductService.class);

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductReviewRepository productReviewRepository;
    private final SellerRepository sellerRepository;
    private final WishlistRepository wishlistRepository;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private MemberRepository memberRepository;

    @Transactional
    public ResponseListBody listProductShop(ProductListRequest request, String type){

        //logger.info("상품 리스트를 가져옵니다.");
        // 클라이언트에서 전달받은 요청 데이터를 기반으로 필터링
       /* String sellerId = request.getSellerID();
        String viewSite = request.getViewSite();
        String showYN = request.getShowYN();
        String deleteYN = request.getDeleteYN();
        String activeYN = request.getActiveYN();
        String nation = request.getNation();
        String name = request.getName();
        String categoryId = request.getCategoryID();

        BigDecimal startPrice = request.getStartPrice();
        BigDecimal endPrice = request.getEndPrice();*/

        // 페이지네이션 및 정렬 처리
        int page = request.getPage();  // 페이지 번호 (0-based index)
        int size = request.getSize(); // 페이지 크기
        String orderBy = request.getOrderBy();
        String orderByType = request.getOrderByType();

        // 정렬 방향 설정
        Sort.Direction direction = "desc".equalsIgnoreCase(orderByType) ? Sort.Direction.DESC : Sort.Direction.ASC;

        // Pageable 객체 생성
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, orderBy));

        List<String> params = request.getParams();
        List<String> values = request.getValues();

        // Repository 호출
       /* Page<Product> productPage = productRepository.findProductsByCriteria(
                sellerId,
                viewSite,
                name,
                categoryId,
                showYN,
                deleteYN,
                activeYN,
                nation,
                startPrice,
                endPrice,
                pageable
        );*/

        Page<Product> productPage = productRepository.findProductsByDynamicCriteria(params, values, pageable);


        // Product -> ProductDto 변환
        List<ProductDto> productList = productPage.getContent().stream()
                .map(ProductDto::new)
                .collect(Collectors.toList());

        if(type == "admin"){
            List<ProductListResponseAdmin> adminList = new ArrayList<>();

            for(Product productDto : productPage){
                ProductListResponseAdmin newProduct = new ProductListResponseAdmin();
                Member seller = memberRepository.findById(productDto.getSellerId())
                        .orElseThrow(() -> new NoMemberException("없는 회원 정보입니다."));

                newProduct.setProductId(productDto.getProductId());
                newProduct.setProductName(productDto.getName());
                newProduct.setSellerName(seller.getFirstName() + " " + seller.getLastName());
                newProduct.setStock(productDto.getStock());
                newProduct.setActiveYN(productDto.getActiveYN());

                adminList.add(newProduct);
            }

            return new ResponseListBody((long) adminList.size(), adminList);
        }
        else{
            List<ProductListResponseShop> shopList = new ArrayList<>();

            for(Product productDto : productPage){
                ProductListResponseShop newProduct = new ProductListResponseShop();

                newProduct.setProductId(productDto.getProductId());
                newProduct.setThumbnail(productDto.getThumbnail());
                newProduct.setProductName(productDto.getName());
                newProduct.setPrice(productDto.getRealPrice());

                List<ProductReview> reiviews = productReviewRepository.findByProductId(productDto.getProductId());
                OptionalDouble averageScore = reiviews.stream()
                        .mapToInt(ProductReview::getScore) // Score 필드를 int로 매핑
                        .average(); // 평균 계산

                newProduct.setAverageScore(averageScore.orElse(0.0));

                shopList.add(newProduct);
            }

            return new ResponseListBody((long) shopList.size(), shopList);
        }


    }

    public DetailProductResponse getProductDetail(String productId) {
        logger.info("상품 정보를 가져옵니다.");
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NoDataException("해당 상품을 찾을 수 없습니다. 상품 ID: " + productId));

        logger.info("상품 카테고리 정보를 가져옵니다.");
        Category category = categoryRepository.findByCategoryId(product.getCategoryId())
                .orElseThrow(() -> new NoMemberException("없는 카테고리입니다."));

        if(jwtTokenProvider != null){
            String memberId = jwtTokenProvider.getCurrentMemberId()
                    .orElseThrow(() -> new NoMemberException("없는 회원입니다."));
            return new DetailProductResponse(product, category.getName(),wishlistRepository.existsByMemberIdAndProductId(memberId, productId));
        }

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
            if (registerProductRequest.getShowYN() != null) {
                existingProduct.setShowYN(registerProductRequest.getShowYN());
            }
            if (registerProductRequest.getDeleteYN() != null) {
                existingProduct.setDeleteYN(registerProductRequest.getDeleteYN());
            }
            if (registerProductRequest.getActiveYN() != null) {
                existingProduct.setActiveYN(registerProductRequest.getActiveYN());
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
