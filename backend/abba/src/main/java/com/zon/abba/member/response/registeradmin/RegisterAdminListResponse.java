package com.zon.abba.member.response.registeradmin;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class RegisterAdminListResponse {

    private String changeRequestId;

    private String status;

    private String statusValue;

    private String createdTime;
    private String moditiedTime;

    private String memberID;
    private String memberName;
    private String memberPhone;


    public RegisterAdminListResponse(String changeRequestId, String status, String createdTime, String moditiedTime,
                                     String memberId, String memberName, String memberPhone) {
        this.changeRequestId = changeRequestId;
        this.status = status;
        this.createdTime = createdTime;
        this.moditiedTime = moditiedTime;
        this.memberID = memberId;
        this.memberName = memberName;
        this.memberPhone = memberPhone;

        switch (status){
            default: 
            case "1" : statusValue = "신청"; break;
            case "2" : statusValue = "승인"; break;
            case "3" : statusValue = "반려"; break;
        }
    }
}
