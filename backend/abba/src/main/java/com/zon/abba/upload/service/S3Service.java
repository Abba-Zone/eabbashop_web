package com.zon.abba.upload.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.zon.abba.common.response.ResponseBody;
import com.zon.abba.common.response.ResponseListBody;
import com.zon.abba.upload.request.FileUrlRequest;
import com.zon.abba.upload.dto.FileUrl;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
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

    @Transactional
    public ResponseBody deleteFile(FileUrlRequest files) throws IOException{
        logger.info("파일을 S3에 삭제합니다.");
        for(FileUrl fileUrl : files.getFiles()){
            String fileName = fileUrl.getFileUrl().substring(fileUrl.getFileUrl().lastIndexOf("/") + 1);
            fileName = URLDecoder.decode(fileName, StandardCharsets.UTF_8);
            logger.info("{}을 S3에서 삭제합니다.", fileName);
            ObjectMetadata metadata = new ObjectMetadata();

            metadata.addUserMetadata("x-amz-tagging", "delete-requested");

            amazonS3Client.deleteObject(bucket, fileName);
            logger.info("{}, 삭제 완료.", fileName);
        }
        return new ResponseBody("성공했습니다.");
    }
}
