package com.Velvora.service.impl;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.Velvora.domain.USER_ROLE;
import com.Velvora.model.User;
import com.Velvora.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
@org.springframework.core.annotation.Order(2)
public class DataInitializationComponent implements CommandLineRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        initializeAdminUser();
    }

    private void initializeAdminUser(){
        String adminUsername="yasuyouwaraj@gmail.com";
        if(userRepository.findByEmail(adminUsername)==null){
            User adminUser = new User();

            adminUser.setPassword(passwordEncoder.encode("amanyasu"));
            adminUser.setFullName("Aman");
            adminUser.setEmail(adminUsername);
            adminUser.setRole(USER_ROLE.ROLE_ADMIN);

            userRepository.save(adminUser);
        }
    }
}
