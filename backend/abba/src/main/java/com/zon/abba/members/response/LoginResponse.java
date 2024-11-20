package com.zon.abba.members.response;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class LoginResponse {
    private String accessToken;
    private String refreshToken;
    private String firstName;
    private String lastName;
    private String role;
}
