package com.zon.abba.common.exception;

import com.zon.abba.members.response.SignupResponse;
import lombok.Getter;

@Getter
public class SignupException extends RuntimeException{
    private SignupResponse signupResponse;

    // 기본 생성자
    public SignupException() {
        super();
    }

    // 에러 메시지를 받는 생성자
    public SignupException(String message) {
        super(message);
    }

    // 에러 메시지와 원인 예외를 받는 생성자
    public SignupException(String message, Throwable cause) {
        super(message, cause);
    }

    // 에러 코드와 메시지를 받는 생성자
    public SignupException(String message, SignupResponse signupResponse) {
        super(message);
        this.signupResponse = signupResponse;
    }
}
