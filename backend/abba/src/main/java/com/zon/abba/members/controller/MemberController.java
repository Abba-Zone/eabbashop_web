package com.zon.abba.members.controller;

import com.zon.abba.common.code.StatusCode;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.members.request.LoginRequest;
import com.zon.abba.members.response.LoginResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {
    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);

    @PostMapping("/login")
    public ResponseEntity<Object> memberLogin(@RequestBody LoginRequest loginRequest){

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseBody(
                StatusCode.SUCCESS,
                new LoginResponse("test")

        ));
    }
}
