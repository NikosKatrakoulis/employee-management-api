package com.nikoskatrakoulis.employeemanagementapi.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class EmployeeResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String department;

    private BigDecimal salary;
}
