package com.zon.abba.product.repository;

import com.zon.abba.product.entity.ProductReview;
import com.zon.abba.product.entity.ReviewFeedbackHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewFeedbackHistoryRepository extends JpaRepository<ReviewFeedbackHistory, String> {

    // 특정 리뷰(ProductReviewID)와 특정 회원(MemberID)로 존재 여부 확인
    boolean existsByProductReviewIdAndMemberId(String productReviewId, String memberId);

}
