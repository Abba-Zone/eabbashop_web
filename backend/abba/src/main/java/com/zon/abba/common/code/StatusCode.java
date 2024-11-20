package com.zon.abba.common.code;

import lombok.Getter;

@Getter
public enum StatusCode implements BasicCode{
    SUCCESS("200", "성공했습니다.");

    private final String code;
    private final String message;

    @Override
    public String getCode(){
        return this.code;
    }

    @Override
    public String getMessage(){
        return this.message;
    }

    StatusCode(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
