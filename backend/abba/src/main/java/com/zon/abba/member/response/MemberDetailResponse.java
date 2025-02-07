package com.zon.abba.member.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.account.dto.WalletDto;
import com.zon.abba.address.dto.AddressDto;
import com.zon.abba.address.entity.Address;
import com.zon.abba.member.dto.MemberInfoDto;
import com.zon.abba.member.dto.SellerDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberDetailResponse {
    @JsonProperty("memberInfo")
    private MemberInfoDto memberInfo;
    private SellerDto seller;
    private WalletDto wallet;
    private List<AddressDto> addresses;

    @JsonProperty("authID")
    private String authID;
    @JsonProperty("authIDList")
    private List<String> authIDList ;
}
