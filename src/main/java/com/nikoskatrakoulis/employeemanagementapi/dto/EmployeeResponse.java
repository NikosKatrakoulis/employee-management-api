package com.nikoskatrakoulis.employeemanagementapi.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class EmployeeResponse {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private Long departmentId;

    private String departmentName;

    private BigDecimal salary;
}
