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
                .status(HttpStatus.UNAUTHORIZED) // 400 Bad Request
                .body(ex.getMessage()); // 에러 메시지 반환
    }

    @ExceptionHandler(NoMemberException.class)
    public ResponseEntity<String> handleNoMemberException(NoMemberException ex){
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT) // 204 없는 회원
                .body(ex.getMessage()); // 에러 메시지 반환
    }

    @ExceptionHandler(SignupException.class)
    public ResponseEntity<SignupErrorResponse> handleSignupException(SignupException ex){
        return ResponseEntity
                .status(HttpStatus.CREATED) // 201 신규 회원
                .body(new SignupErrorResponse(ex.getMessage(), ex.getSignupResponse())); // 에러 메시지 반환
    }
}
