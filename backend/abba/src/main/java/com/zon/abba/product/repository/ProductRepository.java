package com.zon.abba.product.repository;

import com.zon.abba.product.entity.Product;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

@Repository
public interface ProductRepository extends JpaRepository<Product, String>, ProductRepositoryCustom  {
    List<Product> findBySellerIdAndViewSiteAndShowYNAndDeleteYNAndActiveYNAndAllowNationContaining(String SellerID, String ViewSite, String ShowYN, String DeleteYN, String ActiveYn, String AllowNationContaining);

    boolean existsByProductId(String productId);

    @Query(value = "SELECT * FROM Product p WHERE p.ProductID IN :productIds AND p.DeleteYN = 'N'", nativeQuery = true)
    List<Product> findByProductIds(@Param("productIds") List<String> productIds);

    @Query("SELECT p FROM Product p " +
            "WHERE " +
            "(:sellerId IS NULL OR p.sellerId = :sellerId) " +
            "AND (:viewSite IS NULL OR p.viewSite = :viewSite) " +
            "AND (:showYN IS NULL OR p.showYN = :showYN) " +
            "AND (:deleteYN IS NULL OR p.deleteYN = :deleteYN) " +
            "AND (:activeYN IS NULL OR p.activeYN = :activeYN) " +
            "AND (:categoryId IS NULL OR p.categoryId = :categoryId) " +
            "AND (:nation IS NULL OR p.allowNation LIKE %:nation%) " +
            "AND (:name IS NULL OR p.name LIKE %:name%) " +
            "AND (:startPrice IS NULL OR p.realPrice >= :startPrice) " +
            "AND (:endPrice IS NULL OR p.realPrice <= :endPrice)")
    Page<Product> findProductsByCriteria(
            @Param("sellerId") String sellerId,
            @Param("viewSite") String viewSite,
            @Param("name") String name,
            @Param("categoryId") String categoryId,
            @Param("showYN") String showYN,
            @Param("deleteYN") String deleteYN,
            @Param("activeYN") String activeYN,
            @Param("nation") String nation,
            @Param("startPrice") BigDecimal startPrice,
            @Param("endPrice") BigDecimal endPrice,
            Pageable pageable
    );


}
