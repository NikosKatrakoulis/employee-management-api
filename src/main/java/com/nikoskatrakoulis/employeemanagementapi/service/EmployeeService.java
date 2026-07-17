package com.nikoskatrakoulis.employeemanagementapi.service;

import com.nikoskatrakoulis.employeemanagementapi.model.Employee;
import com.nikoskatrakoulis.employeemanagementapi.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {


    private final EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        employees = new ArrayList<>(employees.size());
        return employees;
    }

    public Employee getEmployeeById(Long id) {
        Optional<Employee> employee = this.employeeRepository.findById(id);
        if (employee.isEmpty()) {
            return null;
        } else {
            return employee.get();
        }
    }
}
