package com.zon.abba.common.exception;

import lombok.Getter;

@Getter
public class TooManyException extends RuntimeException{
    private String errorCode; // 에러 코드 추가 (필요한 경우)
    /*
        무엇인가 개수가 많을 때 발생하는 에러
     */
    // 기본 생성자
    public TooManyException() {
        super();
    }

    // 에러 메시지를 받는 생성자
    public TooManyException(String message) {
        super(message);
    }

    // 에러 메시지와 원인 예외를 받는 생성자
    public TooManyException(String message, Throwable cause) {
        super(message, cause);
    }

    // 에러 코드와 메시지를 받는 생성자
    public TooManyException(String errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }
}
