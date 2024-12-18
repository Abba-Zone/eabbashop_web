package com.zon.abba.member.mapping;

import java.time.LocalDateTime;

public interface ChangeRecommendedMembersList {
    Long getChangeRecommendedMemberId();
    String getReferredName();
    String getReferName();
    String getStatus();
    LocalDateTime getCreatedDateTime();
}
