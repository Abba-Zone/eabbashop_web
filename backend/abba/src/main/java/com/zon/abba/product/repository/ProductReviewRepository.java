package com.zon.abba.product.repository;

import com.zon.abba.product.entity.ProductReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductReviewRepository extends JpaRepository<ProductReview, String> {

    List<ProductReview> findByProductId(String productId);
    List<ProductReview> findByMemberId(String memberId);

    void deleteByProductReviewId(String productReviewId);
}
