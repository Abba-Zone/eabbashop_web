package com.zon.abba.members.response;

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
    private String provider;
}
