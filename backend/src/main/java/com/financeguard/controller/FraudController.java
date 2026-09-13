package com.financeguard.controller;

import com.financeguard.model.FraudAlert;
import com.financeguard.model.User;
import com.financeguard.repository.FraudAlertRepository;
import com.financeguard.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/fraud")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class FraudController {

    private final FraudAlertRepository fraudAlertRepository;
    private final AuthService authService;

    @GetMapping("/alerts")
    public ResponseEntity<List<FraudAlert>> getAlerts(
            @RequestHeader("Authorization") String token) {
        User user = authService.getUserFromToken(token);
        return ResponseEntity.ok(fraudAlertRepository.findByUserOrderByCreatedAtDesc(user));
    }

    @PatchMapping("/alerts/{id}/resolve")
    public ResponseEntity<FraudAlert> resolveAlert(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token) {
        authService.getUserFromToken(token);
        FraudAlert alert = fraudAlertRepository.findById(id).orElseThrow();
        alert.setResolved(true);
        return ResponseEntity.ok(fraudAlertRepository.save(alert));
    }
}