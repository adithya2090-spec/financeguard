package com.financeguard.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Data
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private Double amount;
    private String category;
    private String merchant;
    private String description;
    private LocalDateTime timestamp = LocalDateTime.now();
    private Boolean isFraudulent = false;
    private Double fraudScore = 0.0;
    private String location;
}