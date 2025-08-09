package com.example.controller;

import com.example.dto.SkinAnalysisRequest;
import com.example.dto.GeminiResponse;
import com.example.service.SkinAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/skin-analysis")
@CrossOrigin("*")
public class SkinAnalysisController {

    private final SkinAnalysisService skinAnalysisService;

    @Autowired
    public SkinAnalysisController(SkinAnalysisService skinAnalysisService) {
        this.skinAnalysisService = skinAnalysisService;
    }

    @PostMapping
    public GeminiResponse analyzeSkin(@RequestBody SkinAnalysisRequest request) {
        return skinAnalysisService.analyzeSkin(request);
    }
}