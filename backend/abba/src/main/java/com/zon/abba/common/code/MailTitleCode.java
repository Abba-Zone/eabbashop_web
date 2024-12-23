package com.zon.abba.common.code;

import lombok.Getter;

@Getter
public enum MailTitleCode implements BasicCode {
    EMAIL("email", "[Abbazon] Abbazon 메일 인증 코드입니다.");

    private final String code;
    private final String message;

    @Override
    public String getCode() {
        return this.code;
    }

    @Override
    public String getMessage() {
        return this.message;
    }

    MailTitleCode(String code, String message) {
        this.code = code;
        this.message = message;
    }
}
