package com.zon.abba.member.request.recommend;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ListRecommendRequest {
    private Integer pageNo;
    private Integer pageSize;
}
