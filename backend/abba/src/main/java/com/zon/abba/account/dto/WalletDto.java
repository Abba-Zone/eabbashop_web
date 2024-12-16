package com.zon.abba.account.dto;

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
    private String walletID;
    private BigDecimal LP;
    private BigDecimal AK;
    private BigDecimal AP;
    private BigDecimal ABZ;
    private BigDecimal ABZPoint;
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
