package com.zon.abba.member.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MemberListRequest {
    private Integer pageNo;
    private Integer pageSize;
    private String sort;
    private String sortValue;
    private String filter;
    private String filterValue;
}
