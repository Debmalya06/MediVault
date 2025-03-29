package com.example.config;

// filepath: d:\BACKEND\Spring Boot VScode\AI-Paitent website\Backend\AiMedical\src\main\java\com\example\config\CloudinaryConfig.java
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
"cloud_name", "dbhznejhy",
"api_key", "328315313939419",
"api_secret", "hOghdl2O8X_zysDsvyEP0xD6vc0",
"secure", true));
    }
}