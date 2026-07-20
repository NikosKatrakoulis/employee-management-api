package com.nikoskatrakoulis.employeemanagementapi.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;

@Data
public class ValidationErrorResponse {

    private final LocalDateTime timestamp;
    private final int status;
    private final Map<String, String> errors;

}
