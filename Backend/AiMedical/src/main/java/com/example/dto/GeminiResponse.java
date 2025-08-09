package com.example.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GeminiResponse {
    private boolean success;
    private String message;
    private String aiReply;
}