package com.example.AiMedical;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.example.model")
@ComponentScan(basePackages = {"com.example.controller", "com.example.model", "com.example.service", "com.example.config"})

@EnableJpaRepositories(basePackages = "com.example.repository")
public class AiMedicalApplication {

    public static void main(String[] args) {
        SpringApplication.run(AiMedicalApplication.class, args);
    }

}