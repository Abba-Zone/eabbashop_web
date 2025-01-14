package com.zon.abba.product.repository;

import com.zon.abba.product.entity.Product;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Repository;
import java.util.List;

import org.springframework.data.domain.Pageable;
@Repository
public class ProductRepositoryCustomImpl implements ProductRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<Product> findProductsByDynamicCriteria(List<String> params, List<String> values, Pageable pageable) {
        StringBuilder jpql = new StringBuilder("SELECT p FROM Product p WHERE 1=1");

        // 동적 조건 추가
        for (int i = 0; i < params.size(); i++) {
            String paramName = params.get(i);

            if ("Name".equalsIgnoreCase(paramName)) {
                jpql.append(" AND p.").append(paramName).append(" LIKE :param").append(i);
            } else {
                jpql.append(" AND p.").append(paramName).append(" = :param").append(i);
            }
        }

        // JPQL 생성
        TypedQuery<Product> query = entityManager.createQuery(jpql.toString(), Product.class);

        // 파라미터 값 설정
        for (int i = 0; i < values.size(); i++) {
            String paramName = params.get(i);

            if ("Name".equalsIgnoreCase(paramName)) {
                query.setParameter("param" + i, "%" + values.get(i) + "%");
            } else {
                query.setParameter("param" + i, values.get(i));
            }
        }

        // 페이징 적용
        query.setFirstResult((int) pageable.getOffset());
        query.setMaxResults(pageable.getPageSize());

        // 데이터 조회
        List<Product> products = query.getResultList();

        // 총 데이터 수 조회
        String countJpql = jpql.toString().replaceFirst("SELECT p", "SELECT COUNT(p)");
        TypedQuery<Long> countQuery = entityManager.createQuery(countJpql, Long.class);

        for (int i = 0; i < values.size(); i++) {
            countQuery.setParameter("param" + i, values.get(i));
        }
        Long total = countQuery.getSingleResult();

        // Page 객체 반환
        return new PageImpl<>(products, pageable, total);
    }
}