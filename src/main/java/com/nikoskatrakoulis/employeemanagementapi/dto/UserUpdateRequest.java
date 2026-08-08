package com.nikoskatrakoulis.employeemanagementapi.dto;

import com.nikoskatrakoulis.employeemanagementapi.model.Role;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserUpdateRequest {

    @NotBlank(message = "Username is required")
    private String username;

    private String password;

    @NotNull(message = "Role is required")
    private Role role;
}
