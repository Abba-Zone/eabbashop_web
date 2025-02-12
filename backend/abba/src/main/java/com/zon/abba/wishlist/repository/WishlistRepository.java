package com.zon.abba.wishlist.repository;

import com.zon.abba.wishlist.entity.Wishlist;
import com.zon.abba.wishlist.mapping.WishListList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, String> {

    @Query(
            value = "SELECT " +
                    "w.WishlistID AS wishListId, " +
                    "w.ProductID AS productId, " +
                    "p.Name AS name, " +
                    "p.Thumbnail AS thumbnail, " +
                    "p.RealPrice AS realPrice, " +
                    "p.TaxFreePrice AS lp, " +
                    "0.0 AS ak, " +
                    "p.SPPrice AS sp " +
                    "FROM Wishlist w " +
                    "JOIN Product p ON w.ProductID = p.ProductID " +
                    "WHERE w.MemberID = :memberId " +
                    "AND w.DeleteYN = 'N' " +
                    "AND p.DeleteYN = 'N' " +
                    "AND p.ActiveYN = 'Y'",
            nativeQuery = true
    )
    List<WishListList> findWishListWithProductsByMemberId(@Param("memberId") String memberId);

    boolean existsByMemberIdAndProductId(String memberId, String productId);
}
