package com.nikoskatrakoulis.employeemanagementapi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DepartmentResponse {

    private final Long id;
    private final String name;
}
