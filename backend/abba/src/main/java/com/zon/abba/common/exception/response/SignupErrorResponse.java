package com.zon.abba.common.exception.response;

import com.zon.abba.members.response.SignupResponse;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SignupErrorResponse {
    private String message;
    private SignupResponse signupResponse;
}
