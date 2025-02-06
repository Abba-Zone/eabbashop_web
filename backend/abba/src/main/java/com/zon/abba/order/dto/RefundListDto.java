package com.zon.abba.order.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonProperty("refundID")
    private String refundID;
    @JsonProperty("firstName")
    private String firstName;
    @JsonProperty("lastName")
    private String lastName;
    @JsonProperty("phone")
    private String phone;
    @JsonProperty("orderDetailID")
    private String orderDetailID;
    @JsonProperty("createdDateTime")
    private LocalDateTime createdDateTime;
    @JsonProperty("status")
    private Integer status;

    public RefundListDto(RefundOrder refundOrder){
        this.refundID = refundOrder.getRefundId();
        this.firstName = refundOrder.getFirstName();
        this.lastName = refundOrder.getLastName();
        this.phone = refundOrder.getPhone();
        this.orderDetailID = refundOrder.getOrderDetailID();
        this.createdDateTime = refundOrder.getCreatedDateTime();
        this.status = refundOrder.getStatus();
    }
}
