package com.zon.abba.address.controller;

import com.zon.abba.address.request.AddressRequest;
import com.zon.abba.address.request.RegisterAddressRequest;
import com.zon.abba.address.request.SetAddressRequest;
import com.zon.abba.address.request.UpdateAddressRequest;
import com.zon.abba.address.service.AddressService;
import com.zon.abba.common.response.ResponseBody;
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
@RequestMapping("/address")
public class AddressController {
    private static final Logger logger = LoggerFactory.getLogger(AddressController.class);
    private final AddressService addressService;

    @GetMapping("/list")
    @Operation(summary = "주소 목록 반환", description = "주소 리스트 반환")
    public ResponseEntity<Object> listAddress(){
        ResponseListBody response = addressService.listAddress();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/register")
    @Operation(summary = "주소 등록", description = "주소 등록")
    public ResponseEntity<Object> registerAddress(@RequestBody RegisterAddressRequest registerAddressRequest){
        ResponseBody response = addressService.registerAddress(registerAddressRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/delete")
    @Operation(summary = "주소 삭제", description = "주소 삭제")
    public ResponseEntity<Object> deleteAddress(@RequestBody AddressRequest addressRequest){
        ResponseListBody response = addressService.deleteAddress(addressRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/update")
    @Operation(summary = "주소 갱신", description = "주소 갱신")
    public ResponseEntity<Object> updateAddress(@RequestBody UpdateAddressRequest updateAddressRequest){
        ResponseListBody response = addressService.updateAddress(updateAddressRequest);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/set/main")
    @Operation(summary = "메인 주소지 설정", description = "메인 주소 설정")
    public ResponseEntity<Object> setMainAddress(@RequestBody SetAddressRequest setAddressRequest){
        ResponseListBody response = addressService.setAddress(setAddressRequest, 0);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/set/bill")
    @Operation(summary = "청구 주소지 설정", description = "청구 주소 설정")
    public ResponseEntity<Object> setBillAddress(@RequestBody SetAddressRequest setAddressRequest){
        ResponseListBody response = addressService.setAddress(setAddressRequest, 1);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
