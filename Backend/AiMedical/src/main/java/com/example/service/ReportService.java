package com.example.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.Model.Report;
import com.example.Model.User;
import com.example.Repository.ReportRepository;
import com.example.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private Cloudinary cloudinary;

    public Report uploadReport(MultipartFile file, Report report, String userEmail) throws IOException {
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            report.setUser(user);

            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            report.setFileUrl(uploadResult.get("url").toString());

            return reportRepository.save(report);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public List<Report> getReportsByUser(String userEmail) {
        Optional<User> userOptional = userRepository.findByEmail(userEmail);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return reportRepository.findByUser(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public void deleteReport(Long id) {
        reportRepository.deleteById(id);
    }
}