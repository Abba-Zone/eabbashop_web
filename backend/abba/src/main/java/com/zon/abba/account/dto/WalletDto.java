package com.zon.abba.account.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.account.entity.Wallet;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class WalletDto {
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

    public WalletDto(Wallet wallet){
        this.walletID = wallet.getWalletId();
        this.LP = wallet.getLp();
        this.AK = wallet.getAk();
        this.AP = wallet.getAp();
        this.ABZ = wallet.getAbz();
        this.ABZPoint = wallet.getAbzPoint();
        this.SP = wallet.getSp();

    }
}
