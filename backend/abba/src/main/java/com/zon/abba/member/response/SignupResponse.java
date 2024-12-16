package com.zon.abba.member.response;

import lombok.*;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SignupResponse {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String provider;
}
