package com.nikoskatrakoulis.employeemanagementapi.controller;

import com.nikoskatrakoulis.employeemanagementapi.dto.EmployeeCreateRequest;
import com.nikoskatrakoulis.employeemanagementapi.dto.EmployeeResponse;
import com.nikoskatrakoulis.employeemanagementapi.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping
    public List<EmployeeResponse> getAll() {

        return employeeService.getAllEmployees();
    }

    @GetMapping("/{id}")
    public EmployeeResponse getEmployee(@PathVariable(name = "id")Long id) {
        return employeeService.getEmployeeById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EmployeeResponse createEmployee(@Valid @RequestBody EmployeeCreateRequest request) {
        return employeeService.createEmployee(request);
    }

    @PutMapping("/{id}")
    public EmployeeResponse updateEmployee(@PathVariable(name = "id")Long id, @Valid @RequestBody EmployeeCreateRequest request) {
        return employeeService.updateEmployee(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEmployee(@PathVariable(name = "id")Long id) {
        this.employeeService.deleteEmployee(id);
    }

}
