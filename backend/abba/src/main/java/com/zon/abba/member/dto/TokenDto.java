package com.zon.abba.member.dto;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class TokenDto {
    private String accessToken;
    private String refreshToken;
}
