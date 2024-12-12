package com.zon.abba.members.request;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AlterRecommendRequest {
    private String alterRecommendId;
    private String status;
}
