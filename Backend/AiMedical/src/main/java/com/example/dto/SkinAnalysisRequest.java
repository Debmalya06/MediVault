package com.example.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SkinAnalysisRequest {
    private String imageBase64; // or use imageUrl if you prefer
}