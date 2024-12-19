package com.zon.abba.common.exception.handler;

import com.zon.abba.common.exception.*;
import com.zon.abba.common.exception.response.SignupErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(LoginException.class)
    public ResponseEntity<String> handleLoginException(LoginException ex) {
        logger.info("LoginException 발생 : 411");
        return ResponseEntity
                .status(411) // 411 로그인에서 에러남
                .body(ex.getMessage()); // 에러 메시지 반환
    }

    @ExceptionHandler(LogoutException.class)
    public ResponseEntity<String> handleLogoutException(LogoutException ex) {
        logger.info("LogoutException 발생 : 412");
        return ResponseEntity
                .status(412) // 412 로그아웃에서 에러남
                .body(ex.getMessage()); // 에러 메시지 반환
    }

    @ExceptionHandler(ExpiredTokenException.class)
    public ResponseEntity<String> handleExpiredTokenException(ExpiredTokenException ex) {
        logger.info("ExpiredTokenException 발생 : 413");
        return ResponseEntity
                .status(413) // 413 토큰만료됨.
                .body(ex.getMessage()); // 에러 메시지 반환
    }

    @ExceptionHandler(FailPasswordException.class)
    public ResponseEntity<String> handleFailPasswordException(FailPasswordException ex) {
        logger.info("FailPasswordException 발생 : 414");
        return ResponseEntity
                .status(414) // 414 비밀번호 틀림
                .body(ex.getMessage()); // 에러 메시지 반환
    }

    @ExceptionHandler(SignupException.class)
    public ResponseEntity<SignupErrorResponse> handleSignupException(SignupException ex){
        logger.info("SignupException 발생 : 201");
        return ResponseEntity
                .status(201) // 201 신규 회원
                .body(new SignupErrorResponse(ex.getMessage(), ex.getSignupResponse())); // 에러 메시지 반환
    }

    @ExceptionHandler(NoMemberException.class)
    public ResponseEntity<String> handleNoMemberException(NoMemberException ex){
        logger.info("NoMemberException 발생 : 204");
        return ResponseEntity
                .status(204) // 204 없는 회원
                .body(ex.getMessage()); // 에러 메시지 반환
    }

    @ExceptionHandler(InvalidMemberException.class)
    public ResponseEntity<String> handleInvalidMemberException(InvalidMemberException ex){
        logger.info("InvalidMemberException 발생 : 205");
        return ResponseEntity
                .status(205) // 205 회원 정보 불일치
                .body(ex.getMessage()); // 에러 메시지 반환
    }

    @ExceptionHandler(NotMemberException.class)
    public ResponseEntity<String> handleNotMemberException(NotMemberException ex){
        logger.info("NotMemberException 발생 : 206");
        return ResponseEntity
                .status(206) // 206 탈퇴한 회원
                .body(ex.getMessage()); // 에러 메시지 반환
    }

    @ExceptionHandler(NotCodeException.class)
    public ResponseEntity<String> handleNotCodeException(NotCodeException ex){
        logger.info("NotCodeException 발생 : 216");
        return ResponseEntity
                .status(216) // 206 코드가 맞지 않습니다.
                .body(ex.getMessage()); // 에러 메시지 반환
    }

    @ExceptionHandler(NoSellerException.class)
    public ResponseEntity<String> handleNoSellerException(NoSellerException ex){
        logger.info("NoSellerException 발생 : 214");
        return ResponseEntity
                .status(214) // 214 없는 가게
                .body(ex.getMessage()); // 에러 메시지 반환
    }

    @ExceptionHandler(NoDataException.class)
    public ResponseEntity<String> handleNoDataException(NoDataException ex){
        logger.info("NoDataException 발생 : 224");
        return ResponseEntity
                .status(224) // 224 없는 정보
                .body(ex.getMessage()); // 에러 메시지 반환
    }


}
