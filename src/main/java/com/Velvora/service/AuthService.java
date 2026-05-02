package com.Velvora.service;

import com.Velvora.domain.USER_ROLE;
import com.Velvora.request.LoginRequest;
import com.Velvora.response.AuthResponse;
import com.Velvora.response.SignupRequest;

public interface AuthService {
    void sentLoginOtp(String email, USER_ROLE role) throws Exception;

    String createUser(SignupRequest req) throws Exception;

    AuthResponse signing(LoginRequest req);
}
