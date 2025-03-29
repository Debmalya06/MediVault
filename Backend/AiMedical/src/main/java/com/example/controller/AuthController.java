package com.example.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Model.User;
import com.example.dto.LoginRequest;
import com.example.dto.ApiResponse;
import com.example.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {
    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@RequestBody User user) {
        try {
            String result = userService.registerUser(user);
            return ResponseEntity.ok(new ApiResponse(true, result));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse(false, "Registration failed: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            boolean isAuthenticated = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
            if (isAuthenticated) {
                String username = userService.getUsernameByEmail(loginRequest.getEmail());
                return ResponseEntity.ok(new ApiResponse(true, "User Login Successful", username));
            } else {
                return ResponseEntity.status(401).body(new ApiResponse(false, "Invalid Credentials"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse(false, "An error occurred: " + e.getMessage()));
        }
    }
}