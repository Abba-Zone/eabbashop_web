package com.zon.abba.point.mapping;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface ChargeRefundInfo {
    String getChargeRefundId();
    String getSenderWalletId();
    String getReceiverWalletId();
    BigDecimal getAmount();
    BigDecimal getPoint();
    String getCode();
    String getType();
    String getStatus();
    LocalDateTime getCreatedDateTime();
    String getSenderFirstName();
    String getSenderLastName();
    String getSenderEmail();
    String getReceiverFirstName();
    String getReceiverLastName();
    String getReceiverEmail();
    String getAccountId();
    String getBank();
    String getAccountNumber();
    String getAccountFirstName();
    String getAccountLastName();

}
