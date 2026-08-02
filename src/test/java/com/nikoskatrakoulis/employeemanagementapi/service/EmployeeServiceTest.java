package com.nikoskatrakoulis.employeemanagementapi.service;

import com.nikoskatrakoulis.employeemanagementapi.dto.EmployeeResponse;
import com.nikoskatrakoulis.employeemanagementapi.exception.EmployeeNotFoundException;
import com.nikoskatrakoulis.employeemanagementapi.model.Department;
import com.nikoskatrakoulis.employeemanagementapi.model.Employee;
import com.nikoskatrakoulis.employeemanagementapi.repository.DepartmentRepository;
import com.nikoskatrakoulis.employeemanagementapi.repository.EmployeeRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(MockitoExtension.class)
public class EmployeeServiceTest {

    @Mock
    private EmployeeRepository employeeRepository;

    @Mock
    private DepartmentRepository departmentRepository;

    @InjectMocks
    private EmployeeService employeeService;

    @Test
    void getEmployeeId_shouldReturnEmployee_whenEmployeeExists() {
        Department department = new Department();
        department.setId(1L);
        department.setName("Engineering");

        Employee employee = new Employee();
        employee.setId(1L);
        employee.setFirstName("Nikos");
        employee.setLastName("Katrakoulis");
        employee.setEmail("nikos@example.com");
        employee.setDepartment(department);
        employee.setSalary(new BigDecimal(("50000")));

        when(employeeRepository.findById(1L)).thenReturn(Optional.of(employee));

        EmployeeResponse result = employeeService.getEmployeeById(1L);

        assertEquals("Nikos", result.getFirstName());
        assertEquals("Engineering", result.getDepartmentName());
    }

    @Test
    void getEmployeeById_shouldThrowException_whenEmployeeDoesNotExist() {
        Department department = new Department();
        department.setId(1L);
        department.setName("Engineering");

        Employee employee = new Employee();
        employee.setId(1L);
        employee.setFirstName("Nikos");
        employee.setLastName("Katrakoulis");
        employee.setEmail("nikos@example.com");
        employee.setDepartment(department);
        employee.setSalary(new BigDecimal("50000"));

        when(employeeRepository.findById(999L)).thenReturn(Optional.empty());

        assertThrows(EmployeeNotFoundException.class,()-> {
            employeeService.getEmployeeById(999L);
        });
    }


}
