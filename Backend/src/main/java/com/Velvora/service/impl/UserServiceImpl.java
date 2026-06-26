package com.Velvora.service.impl;

import com.Velvora.config.JwtProvider;
import com.Velvora.model.User;
import com.Velvora.repository.UserRepository;
import com.Velvora.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @Override
    public User findUserByJwtToken(String jwt) throws Exception {
        String email = jwtProvider.getEmailFromToken(jwt);
        return this.findUserByEmail(email);
    }

    @Override
    public User findUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if(user == null) {
            throw new RuntimeException("User not found with email: " + email);
        }
        return user;
    }
}
