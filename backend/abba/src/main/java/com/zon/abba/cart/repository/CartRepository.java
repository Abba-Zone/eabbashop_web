package com.zon.abba.cart.repository;

import com.zon.abba.cart.entity.Cart;
import com.zon.abba.cart.mapping.CartList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, String> {

    Optional<Cart> findByCartId(String cartId);
    List<Cart> findByCartIdIn(List<String> cartIds);

    @Query(value = """
        SELECT
            c.CartID AS cartId,
            c.ProductID AS productId,
            p.Thumbnail AS thumbnail,
            p.Name AS name,
            p.Stock AS stock,
            c.Quantity AS quantity,
            p.RealPrice AS realPrice,
            p.SPPrice AS SP,
            c.SelectYN AS selectYN
        FROM Cart c
        JOIN Product p ON c.ProductID = p.ProductID
        WHERE c.MemberID = :memberId
          AND c.DeleteYN = 'N'
          AND p.DeleteYN = 'N'
        ORDER BY c.CreatedDateTime ASC
    """,
            nativeQuery = true)
    List<CartList> findCartListByMemberId(@Param("memberId") String memberId);
}
