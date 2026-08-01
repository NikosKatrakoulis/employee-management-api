package com.nikoskatrakoulis.employeemanagementapi.dto;

import com.nikoskatrakoulis.employeemanagementapi.model.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserResponse {

    private final Long id;
    private final String username;
    private final Role role;
}
