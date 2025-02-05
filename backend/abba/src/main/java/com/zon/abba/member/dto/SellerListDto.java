package com.zon.abba.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonProperty("sellerID")
    private String sellerID;
    @JsonProperty("name")
    private String name;
    @JsonProperty("firstName")
    private String firstName;
    @JsonProperty("lastName")
    private String lastName;
    @JsonProperty("phone")
    private String phone;
    @JsonProperty("createdDateTime")
    private LocalDateTime createdDateTime;

    public SellerListDto(SellerList sellerList){
        this.sellerID = sellerList.getSellerId();
        this.name = sellerList.getName();
        this.firstName = sellerList.getFirstName();
        this.lastName = sellerList.getLastName();
        this.phone = sellerList.getPhone();
        this.createdDateTime = sellerList.getCreatedDateTime();
    }
}
