package com.zon.abba.common.exception;

import com.zon.abba.member.response.SignupResponse;
import com.zon.abba.order.response.ProductStockResponse;
import lombok.Getter;

@Getter
public class OutOfStockException extends RuntimeException{
    private ProductStockResponse response;

    // 기본 생성자
    public OutOfStockException() {
        super();
    }

    // 에러 메시지를 받는 생성자
    public OutOfStockException(String message) {
        super(message);
    }

    // 에러 메시지와 원인 예외를 받는 생성자
    public OutOfStockException(String message, Throwable cause) {
        super(message, cause);
    }

    // 에러 코드와 메시지를 받는 생성자
    public OutOfStockException(String message, ProductStockResponse response) {
        super(message);
        this.response = response;
    }
}
