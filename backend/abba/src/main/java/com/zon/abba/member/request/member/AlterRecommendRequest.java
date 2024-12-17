package com.zon.abba.member.request.member;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AlterRecommendRequest {
    private String alterRecommendId;
    private String status;
}
