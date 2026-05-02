package com.Velvora.service;

import com.Velvora.model.User;

public interface UserService {
    User findUserByJwtToken(String jwt);
    User findUserByEmail(String email);
}
