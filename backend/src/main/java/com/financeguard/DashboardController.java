package com.financeguard.controller;

import com.financeguard.model.User;
import com.financeguard.service.AuthService;
import com.financeguard.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DashboardController {

    private final DashboardService dashboardService;
    private final AuthService authService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getDashboardSummary(
            @RequestHeader("Authorization") String token) {
        User user = authService.getUserFromToken(token);
        return ResponseEntity.ok(dashboardService.getDashboardSummary(user));
    }
}
