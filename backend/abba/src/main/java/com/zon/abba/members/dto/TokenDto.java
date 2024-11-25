package com.zon.abba.members.dto;

import lombok.*;
import org.springframework.context.annotation.Bean;

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
