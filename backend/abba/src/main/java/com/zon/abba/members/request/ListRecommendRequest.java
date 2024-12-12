package com.zon.abba.members.request;

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
