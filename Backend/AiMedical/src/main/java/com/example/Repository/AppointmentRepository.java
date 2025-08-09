package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.model.Appointment;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByEmail(String email);
}