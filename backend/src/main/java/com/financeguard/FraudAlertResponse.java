package com.financeguard.dto;

import com.financeguard.model.Transaction;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FraudAlertResponse {
    private Long id;
    private Transaction transaction;
    private Double riskScore;
    private String reason;
    private Boolean resolved;
    private LocalDateTime createdAt;
}
