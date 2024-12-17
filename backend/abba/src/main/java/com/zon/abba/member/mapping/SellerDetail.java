package com.zon.abba.member.mapping;

import java.time.LocalDateTime;

public interface SellerDetail {
    String getSellerId();
    String getName();
    String getHost();
    String getPhone();
    String getZipCode();
    String getBaseAddress();
    String getDetailAddress();
    LocalDateTime getCreatedDateTime();
}
