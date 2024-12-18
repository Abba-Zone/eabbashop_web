package com.zon.abba.common.exception;

import lombok.Getter;

@Getter
public class NoDataException extends RuntimeException{
    private String errorCode; // 에러 코드 추가 (필요한 경우)

    // 기본 생성자
    public NoDataException() {
        super();
    }

    // 에러 메시지를 받는 생성자
    public NoDataException(String message) {
        super(message);
    }

    // 에러 메시지와 원인 예외를 받는 생성자
    public NoDataException(String message, Throwable cause) {
        super(message, cause);
    }

    // 에러 코드와 메시지를 받는 생성자
    public NoDataException(String errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }
}
