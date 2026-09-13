package com.financeguard.controller;

import com.financeguard.model.Transaction;
import com.financeguard.model.User;
import com.financeguard.service.TransactionService;
import com.financeguard.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TransactionController {

    private final TransactionService transactionService;
    private final AuthService authService;

    @PostMapping
    public ResponseEntity<Transaction> createTransaction(
            @RequestBody Transaction transaction,
            @RequestHeader("Authorization") String token) {
        User user = authService.getUserFromToken(token);
        return ResponseEntity.ok(transactionService.createTransaction(transaction, user));
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getTransactions(
            @RequestHeader("Authorization") String token) {
        User user = authService.getUserFromToken(token);
        return ResponseEntity.ok(transactionService.getUserTransactions(user));
    }

    @GetMapping("/spending")
    public ResponseEntity<Map<String, Double>> getSpending(
            @RequestHeader("Authorization") String token) {
        User user = authService.getUserFromToken(token);
        return ResponseEntity.ok(transactionService.getSpendingByCategory(user));
    }

    @GetMapping("/recommendations")
    public ResponseEntity<Map<String, Object>> getRecommendations(
            @RequestHeader("Authorization") String token) {
        User user = authService.getUserFromToken(token);
        return ResponseEntity.ok(transactionService.getBudgetRecommendations(user));
    }
}