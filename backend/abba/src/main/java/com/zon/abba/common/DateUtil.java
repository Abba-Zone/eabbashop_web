package com.zon.abba.common;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateUtil {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public static LocalDateTime convertToLocalDateTime(String dateStr) {
        return LocalDate.parse(dateStr, DATE_FORMAT).atStartOfDay();
    }
}
