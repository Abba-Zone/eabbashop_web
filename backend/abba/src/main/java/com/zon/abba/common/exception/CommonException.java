package com.zon.abba.common.exception;

import lombok.Getter;

@Getter
public class CommonException extends RuntimeException{
    private String errorCode = "9999"; // 에러 코드 추가 (필요한 경우)

    // 기본 생성자
    public CommonException() {
        super();
    }

    // 에러 메시지를 받는 생성자
    public CommonException(String message) {
        super(message);
    }

    // 에러 메시지와 원인 예외를 받는 생성자
    public CommonException(String message, Throwable cause) {
        super(message, cause);
    }

    // 에러 코드와 메시지를 받는 생성자
    public CommonException(String errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public CommonException(int errorCode, String message) {
        super(message);
        this.errorCode = String.valueOf(errorCode);
    }

    public CommonException(ErrorCode error) {
        super(error.getMessage());
        this.errorCode = String.valueOf(error.getStatusCode());
    }

    public CommonException(ErrorCode error,String errorMessage) {
        super(errorMessage);
        this.errorCode = String.valueOf(error.getStatusCode());
    }
}
