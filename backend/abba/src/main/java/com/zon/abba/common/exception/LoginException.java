package com.zon.abba.common.exception;

public class LoginException extends RuntimeException {
    private String errorCode; // 에러 코드 추가 (필요한 경우)

    // 기본 생성자
    public LoginException() {
        super();
    }

    // 에러 메시지를 받는 생성자
    public LoginException(String message) {
        super(message);
    }

    // 에러 메시지와 원인 예외를 받는 생성자
    public LoginException(String message, Throwable cause) {
        super(message, cause);
    }

    // 에러 코드와 메시지를 받는 생성자
    public LoginException(String errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }
}