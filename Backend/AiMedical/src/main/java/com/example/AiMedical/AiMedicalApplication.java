package com.example.AiMedical;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("com.example.Model")
@ComponentScan(basePackages = {"com.example.controller", "com.example.Model", "com.example.service", "com.example.config"})

@EnableJpaRepositories(basePackages = "com.example.Repository")
public class AiMedicalApplication {

    public static void main(String[] args) {
        SpringApplication.run(AiMedicalApplication.class, args);
    }

}