package com.zon.abba.invoice.mapping;

import java.time.LocalDateTime;

public interface InvoiceList {
    String getInvoiceId();
    String getOrderId();
    String getInvoiceNo();
    String getRecipientName();
    Integer getStatus();
    LocalDateTime getCreatedDateTime();

}
