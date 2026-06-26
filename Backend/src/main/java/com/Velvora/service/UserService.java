package com.Velvora.service;

import com.Velvora.model.User;

public interface UserService {
    User findUserByJwtToken(String jwt) throws Exception;
    User findUserByEmail(String email);
}
