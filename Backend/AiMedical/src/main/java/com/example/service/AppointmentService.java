package com.example.service;

import com.example.dto.AppointmentRequest;
import com.example.model.Appointment;
import com.example.repository.AppointmentRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;

    public AppointmentService(AppointmentRepository appointmentRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public Appointment bookAppointment(AppointmentRequest request) {
        Appointment appointment = new Appointment();
        appointment.setFullName(request.getFullName());
        appointment.setEmail(request.getEmail());
        appointment.setPhone(request.getPhone());
        appointment.setAge(request.getAge());
        appointment.setGender(request.getGender());
        appointment.setAppointmentType(request.getAppointmentType());
        appointment.setSpecialization(request.getSpecialization());
        appointment.setDoctor(request.getDoctor());
        appointment.setAppointmentDate(request.getAppointmentDate());
        appointment.setAppointmentTime(request.getAppointmentTime());
        appointment.setReason(request.getReason());
        appointment.setPreviousVisit(request.getPreviousVisit());
        appointment.setStatus("upcoming");
        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAppointmentsByEmail(String email) {
        return appointmentRepository.findByEmail(email);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }
}