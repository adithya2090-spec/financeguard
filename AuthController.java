package com.financeguard.controller;

import com.financeguard.dto.AuthResponse;
import com.financeguard.dto.LoginRequest;
import com.financeguard.dto.RegisterRequest;
import com.financeguard.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        String token = authService.login(request.getEmail(), request.getPassword());
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        String token = authService.register(request.getEmail(), request.getPassword(), request.getName());
        return ResponseEntity.ok(new AuthResponse(token));
    }
}
