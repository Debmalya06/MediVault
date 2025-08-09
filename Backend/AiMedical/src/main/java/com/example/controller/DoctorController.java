package com.example.controller;

import com.example.dto.DoctorDTO;
import com.example.model.Doctor;
import com.example.service.DoctorService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin("*")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping("/add")
    public Doctor addDoctor(@RequestPart("doctor") String doctorJson, @RequestPart("image") MultipartFile image) throws IOException {
        DoctorDTO doctorDTO = objectMapper.readValue(doctorJson, DoctorDTO.class);
        Doctor doctor = new Doctor();
        doctor.setName(doctorDTO.getName());
        doctor.setSpecialization(doctorDTO.getSpecialization());
        doctor.setEmail(doctorDTO.getEmail());
        doctor.setPhone(doctorDTO.getPhone());
        doctor.setQualification(doctorDTO.getQualification());
        doctor.setExperience(doctorDTO.getExperience());
        doctor.setAvailability(doctorDTO.getAvailability());
        doctor.setStartTime(doctorDTO.getStartTime());
        doctor.setEndTime(doctorDTO.getEndTime());
        doctor.setBio(doctorDTO.getBio());
        return doctorService.addDoctor(doctor, image);
    }

    @GetMapping("/getdoctors")
    public List<Doctor> getAllDoctors() {
        return doctorService.getAllDoctors();
    }
}