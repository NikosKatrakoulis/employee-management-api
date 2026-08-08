package com.nikoskatrakoulis.employeemanagementapi.controller;

import com.nikoskatrakoulis.employeemanagementapi.dto.UserCreateRequest;
import com.nikoskatrakoulis.employeemanagementapi.dto.UserResponse;
import com.nikoskatrakoulis.employeemanagementapi.dto.UserUpdateRequest;
import com.nikoskatrakoulis.employeemanagementapi.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UserResponse> getAll() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserResponse getUser(@PathVariable(name = "id")Long id) {
        return userService.getUserById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse createUser(@Valid @RequestBody UserCreateRequest request) {
        return userService.createUser(request);
    }

    @PutMapping("/{id}")
    public UserResponse updateUser(@PathVariable(name = "id")Long id, @Valid @RequestBody UserUpdateRequest request) {
        return userService.updateUserById(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable(name = "id")Long id) {
        this.userService.deleteUserById(id);
    }


}
