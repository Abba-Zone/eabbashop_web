package com.zon.abba.order.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.order.dto.OrderDetailDto;
import com.zon.abba.order.entity.Orders;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DetailOrderResponse {
    @JsonProperty("orderID")
    private String orderID;
    @JsonProperty("createdDateTime")
    private LocalDateTime createdDateTime;
    @JsonProperty("name")
    private String name;
    @JsonProperty("phone")
    private String phone;
    @JsonProperty("zipCode")
    private String zipCode;
    @JsonProperty("baseAddress")
    private String baseAddress;
    @JsonProperty("detailAddress")
    private String detailAddress;
    @JsonProperty("billZipCode")
    private String billZipCode;
    @JsonProperty("billBaseAddress")
    private String billBaseAddress;
    @JsonProperty("billDetailAddress")
    private String billDetailAddress;
    @JsonProperty("comment")
    private String comment;
    @JsonProperty("totalRealPrice")
    private BigDecimal totalRealPrice;
    @JsonProperty("totalLP")
    private BigDecimal totalLP;
    @JsonProperty("totalAK")
    private BigDecimal totalAK;
    @JsonProperty("totalSP")
    private BigDecimal totalSP;
    @JsonProperty("orderDetails")
    private List<OrderDetailDto> orderDetails;

    public DetailOrderResponse(Orders orders){
        this.orderID = orders.getOrderId();
        this.createdDateTime = orders.getCreatedDateTime();
        this.name = orders.getLastName() + " " + orders.getFirstName();
        this.phone = orders.getPhone();
        this.zipCode = orders.getZipCode();
        this.baseAddress = orders.getBaseAddress();
        this.detailAddress = orders.getDetailAddress();
        this.billZipCode = orders.getBillZipCode();
        this.billBaseAddress = orders.getBillBaseAddress();
        this.billDetailAddress = orders.getBillDetailAddress();
        this.comment = orders.getComment();
        this.totalLP = orders.getLpPrice();
        this.totalAK = orders.getAkPrice();
        this.totalSP = orders.getSpPrice();
    }

}
