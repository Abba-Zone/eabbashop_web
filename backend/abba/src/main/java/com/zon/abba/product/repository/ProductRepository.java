package com.zon.abba.product.repository;

import com.zon.abba.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {
    List<Product> findBySellerIdAndViewSiteAndShowYNAndDeleteYNAndActiveYNAndAllowNationContaining(String SellerID, String ViewSite, String ShowYN, String DeleteYN, String ActiveYn, String AllowNationContaining);

    boolean existsByProductId(String productId);
}
