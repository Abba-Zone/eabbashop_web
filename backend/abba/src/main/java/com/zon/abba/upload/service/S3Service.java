package com.zon.abba.upload.service;

import com.amazonaws.Response;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.zon.abba.address.service.AddressService;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.upload.response.FileUrl;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOError;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class S3Service {
    private final AmazonS3Client amazonS3Client;

    private static final Logger logger = LoggerFactory.getLogger(AmazonS3Client.class);

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Transactional
    public ResponseListBody uploadFile(List<MultipartFile> files) throws IOException{
        List<FileUrl> list = new ArrayList<>();
        logger.info("파일을 S3에 저장합니다.");
        for(MultipartFile file : files){
            String fileName = file.getOriginalFilename();
            logger.info("{}을 S3에 저장합니다.", fileName);
            ObjectMetadata metadata = new ObjectMetadata();

            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());

            amazonS3Client.putObject(bucket, fileName, file.getInputStream(), metadata);
            list.add(new FileUrl(amazonS3Client.getUrl(bucket, fileName).toString()));
            logger.info("{}, 저장 완료.", fileName);
        }

        logger.info("file url list를 반환합니다.");
        return new ResponseListBody((long) list.size(), list);
    }
}
