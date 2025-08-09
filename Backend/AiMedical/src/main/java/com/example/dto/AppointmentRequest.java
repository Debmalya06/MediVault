package com.example.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AppointmentRequest {
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
}