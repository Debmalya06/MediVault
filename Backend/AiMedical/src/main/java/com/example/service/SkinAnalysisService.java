package com.example.service;

import com.example.dto.SkinAnalysisRequest;
import com.example.dto.GeminiResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
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
            String geminiApiUrl = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + geminiApiKey;

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

            // Parse Gemini response to extract only the result text
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(response.getBody());
            String aiReply = "";
            if (root.has("candidates")) {
                JsonNode candidates = root.get("candidates");
                if (candidates.isArray() && candidates.size() > 0) {
                    JsonNode candidate = candidates.get(0);
                    if (candidate.has("content") && candidate.get("content").has("parts")) {
                        JsonNode parts = candidate.get("content").get("parts");
                        if (parts.isArray() && parts.size() > 0 && parts.get(0).has("text")) {
                            aiReply = parts.get(0).get("text").asText();
                        }
                    }
                }
            }

            return new GeminiResponse(true, "AI analysis complete", aiReply);
        } catch (Exception e) {
            return new GeminiResponse(false, "Error: " + e.getMessage(), null);
        }
    }
}