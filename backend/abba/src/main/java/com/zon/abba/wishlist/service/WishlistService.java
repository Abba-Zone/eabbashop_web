package com.zon.abba.wishlist.service;

import com.zon.abba.common.exception.NoDataException;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.common.security.JwtTokenProvider;
import com.zon.abba.product.entity.Product;
import com.zon.abba.product.repository.ProductRepository;
import com.zon.abba.wishlist.dto.WishlistDto;
import com.zon.abba.wishlist.entity.Wishlist;
import com.zon.abba.wishlist.mapping.WishListList;
import com.zon.abba.wishlist.repository.WishlistRepository;
import com.zon.abba.wishlist.request.RegisterWishlistRequest;
import com.zon.abba.wishlist.request.WishlistIdRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishlistService {
    private static final Logger logger = LoggerFactory.getLogger(WishlistService.class);

    private final JwtTokenProvider jwtTokenProvider;
    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;

    @Transactional
    public ResponseListBody wishlistList(){
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        List<WishListList> wishListLists = wishlistRepository.findWishListWithProductsByMemberId(memberId);

        List<WishlistDto> list = wishListLists.stream()
                .map(WishlistDto::new)
                .toList();

        return new ResponseListBody((long) list.size(), list);
    }

    @Transactional
    public ResponseBody registerWishlist(RegisterWishlistRequest request){
        logger.info("위시리스트에 등록합니다.");

        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        Product product = productRepository.findById(request.getProductID())
                .orElseThrow(() -> new NoDataException("없는 상품입니다."));

        Wishlist wishlist = Wishlist.builder()
                .memberId(memberId)
                .productId(request.getProductID())
                .createdId(memberId)
                .modifiedId(memberId)
                .build();

        wishlistRepository.save(wishlist);

        logger.info("등록에 성공했습니다.");
        return new ResponseBody("성공했습니다.");
    }

    @Transactional
    public ResponseBody deleteWishlist(WishlistIdRequest request){
        logger.info("위시리스트에서 삭제합니다.");

        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        Wishlist wishlist = wishlistRepository.findById(request.getWishlistID())
                .orElseThrow(() -> new NoDataException("없는 위시리스트입니다."));

        wishlist.setDeleteYN("Y");
        wishlist.setModifiedId(memberId);

        wishlistRepository.save(wishlist);

        logger.info("위시리스트에서 삭제를 완료했습니다.");
        return new ResponseBody("성공했습니다.");
    }
}
