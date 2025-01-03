package com.zon.abba.upload.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.zon.abba.upload.dto.FileUrl;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class FileUrlRequest {
    @JsonProperty("files")
    private List<FileUrl> files;
}
