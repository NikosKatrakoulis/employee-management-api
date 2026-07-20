package com.nikoskatrakoulis.employeemanagementapi.service;

import com.nikoskatrakoulis.employeemanagementapi.dto.EmployeeCreateRequest;
import com.nikoskatrakoulis.employeemanagementapi.dto.EmployeeResponse;
import com.nikoskatrakoulis.employeemanagementapi.exception.EmployeeNotFoundException;
import com.nikoskatrakoulis.employeemanagementapi.model.Employee;
import com.nikoskatrakoulis.employeemanagementapi.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@RequiredArgsConstructor
public class EmployeeService {


    private final EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();

    }

    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found with id: " + id));
    }

    public Employee createEmployee(EmployeeCreateRequest employee) {
        EmployeeCreateRequest employeeCreateRequest = employeeRepository

        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(Long id, Employee updateData) {
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found with id: " + id));
        existingEmployee.setFirstName(updateData.getFirstName());
        existingEmployee.setLastName(updateData.getLastName());
        existingEmployee.setEmail(updateData.getEmail());
        existingEmployee.setDepartment(updateData.getDepartment());
        existingEmployee.setSalary(updateData.getSalary());

        return employeeRepository.save(existingEmployee);
    }

    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new EmployeeNotFoundException("Employee not found with id: " + id);
        } else {
            employeeRepository.deleteById(id);
        }
    }

    private Employee toEntity(EmployeeCreateRequest request) {
        return new Employee(request.getFirstName(), request.getLastName(), request.getEmail(), request.getDepartment(), request.getSalary());
    }

    private EmployeeResponse toResponse(Employee employee) {
        return new EmployeeResponse(employee.getId(), employee.getFirstName(), employee.getLastName(), employee.getEmail(), employee.getDepartment(), employee.getSalary());
    }
}
