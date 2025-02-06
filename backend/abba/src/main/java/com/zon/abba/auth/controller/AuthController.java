package com.zon.abba.auth.controller;

import com.zon.abba.auth.request.RoleAddRequest;
import com.zon.abba.auth.service.AuthService;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseDataBody;
import com.zon.abba.common.response.ResponseListBody;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/authrole")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;

    @GetMapping("/list")
    @Operation(description = "role list", summary = "권한 리스트 반환")
    public ResponseEntity<Object> boardList(){
        ResponseListBody response = authService.authList();

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/register")
    @Operation(description = "role register", summary = "권한 등록")
    public ResponseEntity<Object> registerBoard(@RequestBody RoleAddRequest roleAddRequest){
        ResponseDataBody response = authService.registerAuth(roleAddRequest);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/{roleId}")
    public ResponseEntity<String> deleteRole(@PathVariable String roleId) {
        authService.deleteRole(roleId);
        //return ResponseEntity.ok("Role 삭제 성공: " + roleId);
        return ResponseEntity.ok("삭제에 성공했습니다.");
    }

}
