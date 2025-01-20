package com.zon.abba.invoice.controller;

import com.zon.abba.common.request.RequestList;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.invoice.request.RegisterInvoiceRequest;
import com.zon.abba.invoice.service.InvoiceService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/invoice")
public class InvoiceController {
    private static final Logger logger = LoggerFactory.getLogger(InvoiceController.class);

    private final InvoiceService invoiceService;

    @PostMapping("/register")
    @Operation(summary = "송장 등록", description = "배송 처리시 송장을 등록할 수 있다.")
    public ResponseEntity<Object> registerInvoice(@RequestBody RegisterInvoiceRequest request){

        ResponseBody response = invoiceService.registerInvoice(request);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/list")
    @Operation(summary = "송장 조회", description = "송장 리스트를 확인할 수 있다.")
    public ResponseEntity<Object> invoiceList(RequestList request){
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @GetMapping("/detail")
    @Operation(summary = "송장 상세", description = "송장 내용을 확인할 수 있다.")
    public ResponseEntity<Object> detailInvoice(){
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @PostMapping("/update")
    @Operation(summary = "송장 수정", description = "송장 내용을 수정할 수 있다.")
    public ResponseEntity<Object> updateInvoice(){
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @PostMapping("/delete")
    @Operation(summary = "송장 삭제", description = "송장 내용을 삭제할 수 있다.")
    public ResponseEntity<Object> deleteInvoice(){
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}
