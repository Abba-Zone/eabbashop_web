package com.zon.abba.upload.controller;

import com.zon.abba.address.controller.AddressController;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.upload.service.S3Service;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/upload")
public class UploadController {
    private static final Logger logger = LoggerFactory.getLogger(UploadController.class);

    private final S3Service s3Service;
    @PostMapping
    public ResponseEntity<Object> uploadFile(@RequestParam("files") List<MultipartFile> files) {
        try {
            ResponseListBody list = s3Service.uploadFile(files);
            return ResponseEntity.status(HttpStatus.OK).body(list);
        }catch (IOException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file: " + e.getMessage());
        }


    }
}
