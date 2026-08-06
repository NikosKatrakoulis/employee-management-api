package com.nikoskatrakoulis.employeemanagementapi.controller;

import com.nikoskatrakoulis.employeemanagementapi.dto.LoginRequest;
import com.nikoskatrakoulis.employeemanagementapi.dto.LoginResponse;
import com.nikoskatrakoulis.employeemanagementapi.exception.UserNotFoundException;
import com.nikoskatrakoulis.employeemanagementapi.model.AppUser;
import com.nikoskatrakoulis.employeemanagementapi.repository.UserRepository;
import com.nikoskatrakoulis.employeemanagementapi.security.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        AppUser user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        String token = jwtService.generateToken(user.getUsername(), user.getRole().name());

        return new LoginResponse(token, user.getUsername(), user.getRole().name());
    }

}
