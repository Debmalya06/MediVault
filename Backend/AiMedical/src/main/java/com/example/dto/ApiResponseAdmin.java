package com.example.dto;

import com.example.model.Admin;

public class ApiResponseAdmin {
    private boolean success;
    private String message;
    private String adminname;
    private Object data;

    public ApiResponseAdmin(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public ApiResponseAdmin(boolean success, String message, String adminname) {
        this.success = success;
        this.message = message;
        this.adminname = adminname;
    }

    public ApiResponseAdmin(boolean success, String message, String adminname, Object data) {
        this.success = success;
        this.message = message;
        this.adminname = adminname;
        this.data = data;
    }

    // Getters and Setters
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getAdminname() {
        return adminname;
    }

    public void setAdminname(String adminname) {
        this.adminname = adminname;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}