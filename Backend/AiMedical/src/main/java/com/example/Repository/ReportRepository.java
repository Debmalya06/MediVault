// filepath: d:\BACKEND\Spring Boot VScode\AI-Paitent website\Backend\AiMedical\src\main\java\com\example\Repository\ReportRepository.java
package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.Report;
import com.example.model.User;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByUser(User user);
}