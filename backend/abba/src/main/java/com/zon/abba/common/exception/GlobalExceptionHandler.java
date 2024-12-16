package com.zon.abba.common.exception;

import com.zon.abba.common.exception.response.SignupErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(LoginException.class)
    public ResponseEntity<String> handleLoginException(LoginException ex) {
        return ResponseEntity
                .status(411) // 411 로그인에서 에러남
                .body(ex.getMessage()); // 에러 메시지 반환
    }

    @ExceptionHandler(LogoutException.class)
    public ResponseEntity<String> handleLogoutException(LogoutException ex) {
        return ResponseEntity
                .status(412) // 412 로그아웃에서 에러남
                .body(ex.getMessage()); // 에러 메시지 반환
    }

    @ExceptionHandler(ExpiredTokenException.class)
    public ResponseEntity<String> handleExpiredTokenException(ExpiredTokenException ex) {
        return ResponseEntity
                .status(413) // 413 토큰만료됨.
                .body(ex.getMessage()); // 에러 메시지 반환
    }

    @ExceptionHandler(FailPasswordException.class)
    public ResponseEntity<String> handleFailPasswordException(FailPasswordException ex) {
        return ResponseEntity
                .status(414) // 414 비밀번호 틀림
                .body(ex.getMessage()); // 에러 메시지 반환
    }

    @ExceptionHandler(NoMemberException.class)
    public ResponseEntity<String> handleNoMemberException(NoMemberException ex){
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT) // 204 없는 회원
                .body(ex.getMessage()); // 에러 메시지 반환
    }

    @ExceptionHandler(InvalidMemberException.class)
    public ResponseEntity<String> handleInvalidMemberException(InvalidMemberException ex){
        return ResponseEntity
                .status(205) // 205 회원 정보 불일치
                .body(ex.getMessage()); // 에러 메시지 반환
    }

    @ExceptionHandler(SignupException.class)
    public ResponseEntity<SignupErrorResponse> handleSignupException(SignupException ex){
        return ResponseEntity
                .status(HttpStatus.CREATED) // 201 신규 회원
                .body(new SignupErrorResponse(ex.getMessage(), ex.getSignupResponse())); // 에러 메시지 반환
    }
}
