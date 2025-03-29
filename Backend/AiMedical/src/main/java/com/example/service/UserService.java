package com.example.service;

import org.springframework.stereotype.Service;
import com.example.Model.User;
import com.example.Repository.UserRepository;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Register a new user
    public String registerUser(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            return "Email already exists!";
        }
        userRepository.save(user);
        return "User registered successfully!";
    }

    // Login user
    public boolean loginUser(String email, String password) {
        Optional<User> foundUser = userRepository.findByEmail(email);
        return foundUser.isPresent() && foundUser.get().getPassword().equals(password);
    }

    // Get username by email
    public String getUsernameByEmail(String email) {
        Optional<User> foundUser = userRepository.findByEmail(email);
        return foundUser.map(User::getUsername).orElse(null);
    }
}