package com.nikoskatrakoulis.employeemanagementapi.controller;

import com.nikoskatrakoulis.employeemanagementapi.service.EmployeeService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    private final EmployeeService employeeService;

    public WebController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/employees")
    public String employeePage(Model model) {
        model.addAttribute("employees", employeeService.getAllEmployees());
        return "employees";
    }
}
