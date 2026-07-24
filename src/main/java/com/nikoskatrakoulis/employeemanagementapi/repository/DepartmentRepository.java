package com.nikoskatrakoulis.employeemanagementapi.repository;

import com.nikoskatrakoulis.employeemanagementapi.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
}
