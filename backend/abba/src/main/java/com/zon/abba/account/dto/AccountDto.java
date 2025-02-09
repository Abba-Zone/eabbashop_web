package com.zon.abba.account.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.account.entity.Accounts;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AccountDto {
    @JsonProperty("accountID")
    private String accountID;
    @JsonProperty("bank")
    private String bank;
    @JsonProperty("accountNumber")
    private String accountNumber;
    @JsonProperty("firstName")
    private String firstName;
    @JsonProperty("lastName")
    private String lastName;
    @JsonProperty("isMain")
    private Boolean isMain;

    public AccountDto(Accounts accounts){
        this.accountID = accounts.getAccountId();
        this.bank = accounts.getBank();
        this.accountNumber = accounts.getAccountNumber();
        this.firstName = accounts.getFirstName();
        this.lastName = accounts.getLastName();
        this.isMain = accounts.getIsMain();
    }
}
