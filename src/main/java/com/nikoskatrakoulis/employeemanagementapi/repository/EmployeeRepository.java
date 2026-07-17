package com.nikoskatrakoulis.employeemanagementapi.repository;

import com.nikoskatrakoulis.employeemanagementapi.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
