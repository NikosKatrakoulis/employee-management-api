package com.nikoskatrakoulis.employeemanagementapi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class EmployeeResponse {

    private final Long id;

    private final String firstName;

    private final String lastName;

    private final String email;

    private final Long departmentId;

    private final String departmentName;

    private final BigDecimal salary;
}
