package com.zon.abba.board.mapping;

import java.time.LocalDateTime;

public interface BoardList {
    String getBoardId();
    String getName();
    String getTitle();
    String getShowYN();
    String getTopYN();
    LocalDateTime getCreatedDateTime();
}
