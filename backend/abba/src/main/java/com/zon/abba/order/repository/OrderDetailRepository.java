package com.zon.abba.order.repository;

import com.zon.abba.order.entity.OrderDetail;
import com.zon.abba.order.mapping.OrderedProduct;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, String> {
    @Query(
            value = "SELECT " +
                    "od.OrderDetailID AS orderDetailId, " +
                    "od.ProductID AS productId, " +
                    "p.Name AS name, " +
                    "p.AllowNation AS allowNation, " +
                    "p.ViewSite AS viewSite, " +
                    "od.Quantity AS quantity, " +
                    "od.Status AS status, " +
                    "p.Thumbnail AS thumbnail, " +
                    "od.LPPrice AS LP, " +
                    "od.SPPrice AS SP " +
                    "FROM OrderDetail od " +
                    "JOIN Product p ON od.ProductID = p.ProductID " +
                    "WHERE od.DeleteYN = 'N' " +
                    "AND p.DeleteYN = 'N' " +
                    "AND p.ActiveYN = 'Y' " +
                    "AND od.OrderID = :orderId ",
            nativeQuery = true
    )
    List<OrderedProduct> findOrderedProductsByOrderId(@Param("orderId") String orderId);
}
