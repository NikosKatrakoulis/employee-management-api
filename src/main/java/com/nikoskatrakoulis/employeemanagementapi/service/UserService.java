package com.nikoskatrakoulis.employeemanagementapi.service;

import com.nikoskatrakoulis.employeemanagementapi.dto.UserCreateRequest;
import com.nikoskatrakoulis.employeemanagementapi.dto.UserResponse;
import com.nikoskatrakoulis.employeemanagementapi.exception.UserNotFoundException;
import com.nikoskatrakoulis.employeemanagementapi.model.AppUser;
import com.nikoskatrakoulis.employeemanagementapi.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public List<UserResponse> getAllUsers() {
        List<AppUser> users = userRepository.findAll();

        return users.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public UserResponse getUserById(Long id) {
        AppUser user = findUserOrThrow(id);
        return toResponse(user);
    }

    public UserResponse createUser(UserCreateRequest request) {
        AppUser user = toEntity(request);
        AppUser savedUsername = userRepository.save(user);
        return toResponse(savedUsername);
    }

    public UserResponse updateUserById(Long id, UserCreateRequest request) {
        AppUser existingUser = findUserOrThrow(id);
        existingUser.setUsername(request.getUsername());
        existingUser.setRole(request.getRole());
        AppUser savedUser = userRepository.save(existingUser);
        return toResponse(savedUser);
    }

    public void deleteUserById(Long id) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException("User not found with id: " + id);
        } else {
            userRepository.deleteById(id);
        }
    }

    private AppUser findUserOrThrow(Long id) {
        return userRepository.findById(id)
                .orElseThrow(()-> new UserNotFoundException("User not found with id: " + id));
    }

    private AppUser toEntity(UserCreateRequest request) {
        AppUser user = new AppUser();

        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        return user;
    }

    private UserResponse toResponse(AppUser user) {
        return new UserResponse(user.getId(), user.getUsername(), user.getRole());
    }
}
