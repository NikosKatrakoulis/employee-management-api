package com.nikoskatrakoulis.employeemanagementapi.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ErrorResponse {

    private final LocalDateTime timestamp;
    private final int status;
    private final String message;

}
