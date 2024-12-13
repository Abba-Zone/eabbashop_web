package com.zon.abba.member.response;

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
    private MemberInfoDto memberInfo;
    private SellerDto seller;
    private WalletDto wallet;
    private List<AddressDto> addresses;
}
