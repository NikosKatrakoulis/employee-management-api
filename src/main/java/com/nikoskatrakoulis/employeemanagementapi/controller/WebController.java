package com.nikoskatrakoulis.employeemanagementapi.controller;

import com.nikoskatrakoulis.employeemanagementapi.dto.EmployeeCreateRequest;
import com.nikoskatrakoulis.employeemanagementapi.service.DepartmentService;
import com.nikoskatrakoulis.employeemanagementapi.service.EmployeeService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class WebController {

    private final EmployeeService employeeService;

    private final DepartmentService departmentService;

    public WebController(EmployeeService employeeService, DepartmentService departmentService) {
        this.employeeService = employeeService;
        this.departmentService = departmentService;
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

    @PostMapping("/employees/{id}/delete")
    public String deleteEmployee(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
        return "redirect:/employees";
    }

    @GetMapping("/employees/new")
    public String newEmployeeForm(Model model) {
        model.addAttribute("employeeCreateRequest", new EmployeeCreateRequest());
        model.addAttribute("departments", departmentService.getAllDepartments());
        return "/employee-form";
    }

    @PostMapping("/employees")
    public String createEmployee(@Valid @ModelAttribute("employeeCreateRequest")EmployeeCreateRequest request,
                                 BindingResult bindingResult,
                                 Model model) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("departments", departmentService.getAllDepartments());
            return "employee-form";
        }

        employeeService.createEmployee(request);
        return "redirect:/employee";
    }
}
