package com.zon.abba.point.mapping;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface TransferList {
    String getTransferId();
    String getSenderFirstName();
    String getSenderLastName();
    String getReceiverFirstName();
    String getReceiverLastName();
    BigDecimal getLp();
    BigDecimal getAk();
    BigDecimal getSp();
    String getStatus();
    LocalDateTime getModifiedDateTime();

}
