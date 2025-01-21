package com.zon.abba.cart.service;

import com.zon.abba.cart.dto.CartDto;
import com.zon.abba.cart.entity.Cart;
import com.zon.abba.cart.mapping.CartList;
import com.zon.abba.cart.repository.CartRepository;
import com.zon.abba.cart.request.CartIdRequest;
import com.zon.abba.cart.request.RegisterCartRequest;
import com.zon.abba.cart.request.SelectCartRequest;
import com.zon.abba.cart.request.UpdateCartRequest;
import com.zon.abba.common.exception.NoDataException;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.common.security.JwtTokenProvider;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {
    private static final Logger logger = LoggerFactory.getLogger(CartService.class);

    private final CartRepository cartRepository;
    private final JwtTokenProvider jwtTokenProvider;

    // register
    @Transactional
    public ResponseBody registerCart(RegisterCartRequest request){
        logger.info("상품을 장바구니에 추가합니다.");

        logger.info("상품을 등록할 유저 정보를 가져옵니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        logger.info("Cart entity를 형성합니다.");
        Cart cart = Cart.builder()
                .memberId(memberId)
                .productId(request.getProductId())
                .quantity(request.getQuantity())
                .createdId(memberId)
                .modifiedId(memberId)
                .build();

        cartRepository.save(cart);

        logger.info("장바구니 등록에 성공했습니다.");
        return new ResponseBody("성공했습니다.");
    }

    // update
    @Transactional
    public ResponseBody updateCart(UpdateCartRequest request){
        logger.info("장바구니속 상품의 개수를 수정합니다.");

        logger.info("수정한 장바구니 정보를 가져옵니다.");
        Cart cart = cartRepository.findByCartId(request.getCartId())
                .orElseThrow(() -> new NoDataException("없는 장바구니 상품입니다."));

        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        logger.info("Cart 객체 값을 수정합니다.");
        cart.setQuantity(request.getQuantity());
        cart.setModifiedId(memberId);

        cartRepository.save(cart);

        logger.info("장바구니 개수 수정에 성공했습니다.");
        return new ResponseBody("성공했습니다.");
    }

    // select
    @Transactional
    public ResponseBody selectCart(SelectCartRequest request){
        logger.info("장바구니 속 선택할 상품을 지정합니다.");

        logger.info("선택할 장바구니 정보를 가져옵니다.");
        Cart cart = cartRepository.findByCartId(request.getCartId())
                .orElseThrow(() -> new NoDataException("없는 장바구니 상품입니다."));

        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        logger.info("Cart 객체 값을 선택처리 합니다.");
        cart.setSelectYn(request.getSelectYN() ? "Y" : "N");
        cart.setModifiedId(memberId);

        cartRepository.save(cart);

        logger.info("장바구니 상품 선택에 성공했습니다.");
        return new ResponseBody("성공했습니다.");
    }

    // delete
    @Transactional
    public ResponseBody deleteCart(CartIdRequest request){
        logger.info("장바구니 속 상품을 삭제합니다.");

        logger.info("삭제할 장바구니 정보를 가져옵니다.");
        Cart cart = cartRepository.findByCartId(request.getCartId())
                .orElseThrow(() -> new NoDataException("없는 장바구니 상품입니다."));

        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        logger.info("Cart 객체 값을 삭제처리 합니다.");
        cart.setDeleteYn("Y");
        cart.setModifiedId(memberId);

        cartRepository.save(cart);

        logger.info("장바구니 상품 삭제에 성공했습니다.");
        return new ResponseBody("성공했습니다.");
    }

    // list
    @Transactional
    public ResponseListBody cartList(){
        logger.info("장바구니 리스트를 반환합니다.");

        logger.info("유저 정보를 가져옵니다.");
        String memberId = jwtTokenProvider.getCurrentMemberId()
                .orElseThrow(() -> new NoMemberException("없는 회원입니다."));

        logger.info("장바구니 정보를 가져옵니다.");
        List<CartList> carts = cartRepository.findCartListByMemberId(memberId);

        List<CartDto> list = carts.stream()
                        .map(CartDto::new)
                                .toList();

        logger.info("장바구니 리스트 반환에 성공했습니다.");
        return new ResponseListBody((long) list.size(), list);
    }

}
