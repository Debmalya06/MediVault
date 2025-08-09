package com.example.controller;

import com.example.dto.AppointmentRequest;
import com.example.model.Appointment;
import com.example.dto.ApiResponse;
import com.example.service.AppointmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin("*")
public class AppointmentController {

    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping("/book")
    public ResponseEntity<ApiResponse> bookAppointment(@RequestBody AppointmentRequest request) {
        try {
            Appointment appointment = appointmentService.bookAppointment(request);
            return ResponseEntity.ok(new ApiResponse(true, "Appointment booked successfully", appointment));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse(false, "Booking failed: " + e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<Appointment>> getAppointments(@RequestParam(required = false) String email) {
        if (email != null) {
            return ResponseEntity.ok(appointmentService.getAppointmentsByEmail(email));
        } else {
            return ResponseEntity.ok(appointmentService.getAllAppointments());
        }
    }
}