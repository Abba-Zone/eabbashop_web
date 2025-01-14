package com.zon.abba.product.repository;

import com.zon.abba.product.entity.Product;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface ProductRepositoryCustom {
    Page<Product> findProductsByDynamicCriteria(List<String> params, List<String> values, Pageable pageable);
}