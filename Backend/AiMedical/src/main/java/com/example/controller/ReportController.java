package com.example.controller;

import com.example.dto.ApiResponse;
import com.example.model.Report;
import com.example.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin("*")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse> uploadReport(@RequestParam("file") MultipartFile file,
                                                    @RequestParam("reportName") String reportName,
                                                    @RequestParam("reportType") String reportType,
                                                    @RequestParam("reportDate") String reportDate,
                                                    @RequestParam("doctorName") String doctorName,
                                                    @RequestParam("reportNotes") String reportNotes,
                                                    @RequestParam("userEmail") String userEmail) {
        try {
            Report report = new Report();
            report.setReportName(reportName);
            report.setReportType(reportType);
            report.setReportDate(reportDate);
            report.setDoctorName(doctorName);
            report.setReportNotes(reportNotes);

            Report savedReport = reportService.uploadReport(file, report, userEmail);
            return ResponseEntity.ok(new ApiResponse(true, "Report uploaded successfully", savedReport));
        } catch (IOException e) {
            return ResponseEntity.status(500).body(new ApiResponse(false, "An error occurred: " + e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<Report>> getReports(@RequestParam("userEmail") String userEmail) {
        List<Report> reports = reportService.getReportsByUser(userEmail);
        return ResponseEntity.ok(reports);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteReport(@PathVariable Long id) {
        try {
            reportService.deleteReport(id);
            return ResponseEntity.ok(new ApiResponse(true, "Report deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new ApiResponse(false, "An error occurred: " + e.getMessage()));
        }
    }
}