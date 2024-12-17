package com.zon.abba.member.dto;

import com.zon.abba.member.mapping.SellerList;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@AllArgsConstructor
public class SellerListDto {
    private String sellerID;
    private String name;
    private String host;
    private String phone;
    private LocalDateTime createdDateTime;

    public SellerListDto(SellerList sellerList){
        this.sellerID = sellerList.getSellerId();
        this.name = sellerList.getName();
        this.host = sellerList.getHost();
        this.phone = sellerList.getPhone();
        this.createdDateTime = sellerList.getCreatedDateTime();
    }
}
