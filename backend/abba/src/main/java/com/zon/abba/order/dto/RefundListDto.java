package com.zon.abba.order.dto;

import com.zon.abba.order.mapping.RefundOrder;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RefundListDto {
    private String refundID;
    private String name;
    private String phone;
    private String orderDetailID;
    private LocalDateTime createdDateTime;
    private String status;

    public RefundListDto(RefundOrder refundOrder){
        this.refundID = refundOrder.getRefundId();
        this.name = refundOrder.getName();
        this.phone = refundOrder.getPhone();
        this.orderDetailID = refundOrder.getOrderDetailID();
        this.createdDateTime = refundOrder.getCreatedDateTime();
        this.status = refundOrder.getStatus();
    }
}
