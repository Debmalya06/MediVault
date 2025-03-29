package com.example.controller;

import com.example.dto.ApiResponseAdmin;
import com.example.dto.LoginRequest;
import com.example.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admins")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponseAdmin> login(@RequestBody LoginRequest loginRequest) {
        try {
            ApiResponseAdmin response = adminService.login(loginRequest.getEmail(), loginRequest.getPassword());
            if (response.isSuccess()) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(401).body(response);
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponseAdmin(false, "An error occurred: " + e.getMessage()));
        }
    }
}