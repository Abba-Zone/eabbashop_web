package com.zon.abba.order.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.order.mapping.RefundDetail;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DetailRefundResponse {
    @JsonProperty("refundID")
    private String refundID;
    @JsonProperty("orderDetailID")
    private String orderDetailID;
    @JsonProperty("productName")
    private String productName;
    @JsonProperty("thumbnail")
    private String thumbnail;
    @JsonProperty("firstName")
    private String firstName;
    @JsonProperty("lastName")
    private String lastName;
    @JsonProperty("phone")
    private String phone;
    @JsonProperty("message")
    private String message;
    @JsonProperty("status")
    private Integer status;
    @JsonProperty("quantity")
    private Integer quantity;

    public DetailRefundResponse(RefundDetail refundDetail){
        this.refundID = refundDetail.getRefundId();
        this.orderDetailID = refundDetail.getOrderDetailId();
        this.productName = refundDetail.getProductName();
        this.thumbnail = refundDetail.getThumbnail();
        this.firstName = refundDetail.getFirstName();
        this.lastName = refundDetail.getLastName();
        this.phone = refundDetail.getPhone();
        this.message = refundDetail.getMessage();
        this.status = refundDetail.getStatus();
        this.quantity = refundDetail.getQuantity();
    }

}
