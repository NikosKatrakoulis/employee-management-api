package com.nikoskatrakoulis.employeemanagementapi.service;

import com.nikoskatrakoulis.employeemanagementapi.dto.DepartmentCreateRequest;
import com.nikoskatrakoulis.employeemanagementapi.dto.DepartmentResponse;
import com.nikoskatrakoulis.employeemanagementapi.exception.DepartmentNotFoundException;
import com.nikoskatrakoulis.employeemanagementapi.model.Department;
import com.nikoskatrakoulis.employeemanagementapi.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public List<DepartmentResponse> getAllDepartments() {
        List<Department> departments = departmentRepository.findAll();

        return departments.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public DepartmentResponse getDepartmentById(Long id) {
        Department department = findDepartmentOrThrow(id);
        return toResponse(department);
    }

    public DepartmentResponse createDepartment(DepartmentCreateRequest request) {
        Department department = toEntity(request);
        Department savedDepartment = departmentRepository.save(department);
        return toResponse(savedDepartment);
    }

    public DepartmentResponse updateDepartment(Long id, DepartmentCreateRequest request) {
        Department existingDepartment = findDepartmentOrThrow(id);

        existingDepartment.setName(request.getName());

        Department savedDepartment = departmentRepository.save(existingDepartment);
        return toResponse(savedDepartment);
    }

    public void deleteDepartment(Long id) {
        if (!departmentRepository.existsById(id)) {
            throw new DepartmentNotFoundException("Department not found with id: " + id);
        } else {
            departmentRepository.deleteById(id);
        }
    }


    private Department toEntity(DepartmentCreateRequest request) {
        Department department = new Department();

        department.setName(request.getName());
        return department;
    }

    private DepartmentResponse toResponse(Department department) {
        return new DepartmentResponse(department.getId(), department.getName());
    }

    private Department findDepartmentOrThrow(Long departmentId) {
        return departmentRepository.findById(departmentId)
                .orElseThrow(() -> new DepartmentNotFoundException("Department not found with id: " + departmentId));
    }


}
