package com.nikoskatrakoulis.employeemanagementapi.integration;

import org.springframework.http.MediaType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
public class UserControllerIntegrationTest extends AbstractIntegrationTest{

    @Autowired
    private MockMvc mockMvc;

    @Test
    void getInformation_shouldReturnError_whenUserIsNotAdmin() throws Exception{
        mockMvc.perform(post("/api/users")
                .with(httpBasic("admin", "admin123"))
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {"username":"testuser","password":"test123","role":"USER"}
                        """))
                .andExpect(status().isCreated());
        mockMvc.perform(get("/api/users")
                .with(httpBasic("testuser", "test123")))
                .andExpect(status().isForbidden());
    }
}
