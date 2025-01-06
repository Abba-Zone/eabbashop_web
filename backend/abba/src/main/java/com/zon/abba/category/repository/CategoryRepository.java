package com.zon.abba.category.repository;

import com.zon.abba.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
    // 추가적인 쿼리 메서드
    Optional<Category> findByCategoryId(String categoryId);
}