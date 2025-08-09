package com.example.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "appointments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    private String email;
    private String phone;
    private Integer age;
    private String gender;
    private String appointmentType;
    private String specialization;
    private String doctor;
    private String appointmentDate;
    private String appointmentTime;
    private String reason;
    private String previousVisit;
    private String status = "upcoming"; // default status
}