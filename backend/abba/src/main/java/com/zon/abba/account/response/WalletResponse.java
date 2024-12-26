package com.zon.abba.account.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.account.dto.WalletDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WalletResponse {
    @JsonProperty("walletID")
    private String walletID;
    @JsonProperty("LP")
    private BigDecimal LP;
    @JsonProperty("AK")
    private BigDecimal AK;
    @JsonProperty("AP")
    private BigDecimal AP;
    @JsonProperty("ABZ")
    private BigDecimal ABZ;
    @JsonProperty("ABZPoint")
    private BigDecimal ABZPoint;
    @JsonProperty("SP")
    private BigDecimal SP;

    public WalletResponse(WalletDto walletDto){
        this.walletID = walletDto.getWalletID();
        this.LP = walletDto.getLP();
        this.AK = walletDto.getAK();
        this.AP = walletDto.getAP();
        this.ABZ = walletDto.getABZ();
        this.ABZPoint = walletDto.getABZPoint();
        this.SP = walletDto.getSP();
    }
}
