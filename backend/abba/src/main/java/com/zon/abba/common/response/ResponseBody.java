package com.zon.abba.common.response;

import com.zon.abba.common.code.StatusCode;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ResponseBody {
    private String statusCode;
    private String message;
    private Object body;

    public ResponseBody(StatusCode statusCode, Object body){
        this.statusCode = statusCode.getCode();
        this.message = statusCode.getMessage();
        this.body = body;
    }
}
