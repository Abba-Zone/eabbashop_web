package com.zon.abba.members.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberInfoRequest {
    private String firstName;
    private String lastName;
    private String phone;
    private String password;
}
