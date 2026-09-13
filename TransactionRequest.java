package com.financeguard.dto;

import lombok.Data;

@Data
public class TransactionRequest {
    private Double amount;
    private String category;
    private String merchant;
    private String description;
    private String location;
}
