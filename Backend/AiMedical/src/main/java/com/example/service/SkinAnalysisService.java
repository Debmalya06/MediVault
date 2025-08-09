package com.example.service;

import com.example.dto.SkinAnalysisRequest;
import com.example.dto.GeminiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

@Service
public class SkinAnalysisService {

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    public GeminiResponse analyzeSkin(SkinAnalysisRequest request) {
        try {
            // Use the available model from your API key
            String geminiApiUrl = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + geminiApiKey;
            // or use gemini-1.5-pro if you want
            // String geminiApiUrl = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=" + geminiApiKey;

            String prompt = "Analyze this skin image and reply if there is any skin problem. Give instructions for care if needed.";
            String payload = "{\n" +
                    "  \"contents\": [\n" +
                    "    {\n" +
                    "      \"parts\": [\n" +
                    "        {\"text\": \"" + prompt + "\"},\n" +
                    "        {\"inline_data\": {\"mime_type\": \"image/jpeg\", \"data\": \"" + request.getImageBase64() + "\"}}\n" +
                    "      ]\n" +
                    "    }\n" +
                    "  ]\n" +
                    "}";

            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> entity = new HttpEntity<>(payload, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(geminiApiUrl, entity, String.class);

            String aiReply = response.getBody();

            return new GeminiResponse(true, "AI analysis complete", aiReply);
        } catch (Exception e) {
            return new GeminiResponse(false, "Error: " + e.getMessage(), null);
        }
    }
}