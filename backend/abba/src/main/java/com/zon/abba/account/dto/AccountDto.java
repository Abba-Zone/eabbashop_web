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
    @JsonProperty("memberID")
    private String memberID;
    @JsonProperty("bank")
    private String bank;
    @JsonProperty("accountNumber")
    private String accountNumber;
    @JsonProperty("firstName")
    private String firstName;
    @JsonProperty("lastName")
    private String lastName;

    public AccountDto(Accounts accounts){
        this.memberID = accounts.getMemberId();
        this.bank = accounts.getBank();
        this.accountNumber = accounts.getAccountNumber();
        this.firstName = accounts.getFirstName();
        this.lastName = accounts.getLastName();
    }
}
