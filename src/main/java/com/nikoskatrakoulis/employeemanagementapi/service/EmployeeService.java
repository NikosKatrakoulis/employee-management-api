package com.nikoskatrakoulis.employeemanagementapi.service;

import com.nikoskatrakoulis.employeemanagementapi.dto.EmployeeCreateRequest;
import com.nikoskatrakoulis.employeemanagementapi.dto.EmployeeResponse;
import com.nikoskatrakoulis.employeemanagementapi.exception.DepartmentNotFoundException;
import com.nikoskatrakoulis.employeemanagementapi.exception.EmployeeNotFoundException;
import com.nikoskatrakoulis.employeemanagementapi.model.Department;
import com.nikoskatrakoulis.employeemanagementapi.model.Employee;
import com.nikoskatrakoulis.employeemanagementapi.repository.DepartmentRepository;
import com.nikoskatrakoulis.employeemanagementapi.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class EmployeeService {


    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    public List<EmployeeResponse> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();

        return employees.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());

    }

    public EmployeeResponse getEmployeeById(Long id) {
        Employee employee = findEmployeeOrThrow(id);

        return toResponse(employee);
    }

    public EmployeeResponse createEmployee(EmployeeCreateRequest request) {
        Employee employee = toEntity(request);
        Employee savedEmployee = employeeRepository.save(employee);
        return toResponse(savedEmployee);

    }

    public EmployeeResponse updateEmployee(Long id, EmployeeCreateRequest request) {
        Employee existingEmployee = findEmployeeOrThrow(id);
        Department department = findDepartmentOrThrow(request.getDepartmentId());

        existingEmployee.setFirstName(request.getFirstName());
        existingEmployee.setLastName(request.getLastName());
        existingEmployee.setEmail(request.getEmail());
        existingEmployee.setDepartment(department);
        existingEmployee.setSalary(request.getSalary());

        Employee savedEmployee = employeeRepository.save(existingEmployee);

        return toResponse(savedEmployee);
    }

    public void deleteEmployee(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new EmployeeNotFoundException("Employee not found with id: " + id);
        } else {
            employeeRepository.deleteById(id);
        }
    }

    private Employee toEntity(EmployeeCreateRequest request) {
        Employee employee = new Employee();
        employee.setFirstName(request.getFirstName());
        employee.setLastName(request.getLastName());
        employee.setEmail(request.getEmail());

        Department department = findDepartmentOrThrow(request.getDepartmentId());
        employee.setDepartment(department);
        employee.setSalary(request.getSalary());
        return employee;
    }

    private EmployeeResponse toResponse(Employee employee) {
        return new EmployeeResponse(employee.getId(), employee.getFirstName(), employee.getLastName(), employee.getEmail(), employee.getDepartment().getId(), employee.getDepartment().getName(), employee.getSalary());
    }

    private Department findDepartmentOrThrow(Long departmentId) {
        return departmentRepository.findById(departmentId)
                .orElseThrow(()-> new DepartmentNotFoundException("Department not found with id: " + departmentId));
    }

    private Employee findEmployeeOrThrow(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new EmployeeNotFoundException("Employee not found with id: " + id));
    }
}
