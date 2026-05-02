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
    public User findUserByJwtToken(String jwt) {
        return null;
    }

    @Override
    public User findUserByEmail(String email) {
        return null;
    }
}
