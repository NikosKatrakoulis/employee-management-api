package com.nikoskatrakoulis.employeemanagementapi.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DepartmentCreateRequest {

    @NotBlank(message = "Name is required")
    private String name;
}
