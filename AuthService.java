package com.financeguard.service;

import com.financeguard.config.JwtConfig;
import com.financeguard.model.User;
import com.financeguard.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtConfig jwtConfig;

    public String register(String email, String password, String name) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email already in use");
        }
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setName(name);
        userRepository.save(user);

        return jwtConfig.generateToken(email);
    }

    public String login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return jwtConfig.generateToken(email);
    }

    public User getUserFromToken(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            String email = jwtConfig.extractEmail(token);
            return userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }
        throw new RuntimeException("Invalid token");
    }
}
