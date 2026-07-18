package com.nikoskatrakoulis.employeemanagementapi.service;

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

    public Employee createEmployee(Employee employee) {
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
}
