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
    private String message;
}
