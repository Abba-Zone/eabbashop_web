package com.zon.abba.common.exception;

import java.util.HashMap;
import java.util.Map;

public enum ErrorCode {
    SUCCESS(200, "성공했습니다"),
    NEW_USER(201, "신규회원입니다."),
    NO_CUSTOMER_INFO(204, "고객 정보가 음슴다."),
    INFO_MISMATCH(205, "정보 불일치"),
    WITHDRAWN_USER(206, "탈퇴한 회원입니다."),
    NO_ADMIN(207, "본사 계정이 아닙니다."),
    NO_WALLET(208, "지갑이 없는 회원입니다."),
    NO_MENU(209, "존재하지 않는 메뉴입니다."),
    STORE_NOT_FOUND(214, "없는 가게입니다."),
    INVALID_CODE(216, "코드가 맞지 않습니다."),
    NO_DATA(224, "데이터가 없습니다."),
    DATA_REGISTRATION_FAILED(226, "데이터 등록에 실패했습니다."),
    DATA_UPDATE_FAILED(227, "데이터 수정에 실패했습니다."),
    DATA_RETRIEVAL_FAILED(228, "데이터 조회에 실패했습니다."),
    TOO_MUCH_INFO(230, "먼가 많은 정보일 때"),
    OUT_OF_STOCK(233, "OutOfStock - 수량 부족"),
    INSUFFICIENT_FUNDS(234, "금액 부족"),
    INSUFFICIENT_ABZ_POINTS(241, "대리점 신청에 필요한 ABZ포인트가 부족합니다"),
    AGENCY_APPLICATION_FAILED(242, "대리점 신청에 실패했습니다."),
    VALIDATION_ERROR(400, "입력값 유효성 검증 실패"),
    AUTHENTICATION_ERROR(401, "인증 에러"),
    AUTHORIZATION_ERROR(403, "권한 에러"),
    LOGIN_ERROR(411, "로그인에서 에러남"),
    LOGOUT_ERROR(412, "로그아웃에서 에러남"),
    TOKEN_EXPIRED(413, "토큰 만료됨"),
    INCORRECT_PASSWORD(414, "비밀번호 틀림"),
    NO_AUTH_SELECT(415, "권한이 없는 조회입니다"),
    NO_MENU_PERMISSION(475, "권한이 없는 메뉴"),
    INTERNAL_SERVER_ERROR(500, "개발자 쉨 오류 냈죠? 슈슉 아무거도모다죠? 응못죽이죠 코드고쳤쥬 또오류내쥬 못난 백엔드를 둔 프론트에게 정말 미안하다!!");

    private final int statusCode;
    private final String message;

    // statusCode 기반으로 빠르게 검색할 수 있도록 캐시(Map) 생성
    private static final Map<Integer, ErrorCode> CODE_MAP = new HashMap<>();

    static {
        for (ErrorCode error : values()) {
            CODE_MAP.put(error.statusCode, error);
        }
    }

    ErrorCode(int statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public String getMessage() {
        return message;
    }

    // Enum을 직접 사용해서 statusCode를 찾기
    public static int getCode(ErrorCode errorCode) {
        return errorCode.getStatusCode();
    }

    // statusCode로 ErrorCode 찾기
    public static ErrorCode fromCode(int statusCode) {
        return CODE_MAP.getOrDefault(statusCode, null);
    }
}
