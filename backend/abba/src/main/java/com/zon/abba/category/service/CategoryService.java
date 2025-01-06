package com.zon.abba.category.service;

import com.zon.abba.category.entity.Category;
import com.zon.abba.category.repository.CategoryRepository;
import com.zon.abba.common.exception.NoMemberException;
import com.zon.abba.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    /**
     * categoryId로 Category Name을 가져오는 메서드
     *
     * @param categoryId 카테고리 ID
     * @return 카테고리 Name
     * @throws IllegalArgumentException 해당 ID가 존재하지 않을 경우
     */
    public String getCategoryNameById(String categoryId) {
        Category category = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new NoMemberException("없는 카테고리."));

        return category.getName(); // Entity에서 Name 반환
    }
}