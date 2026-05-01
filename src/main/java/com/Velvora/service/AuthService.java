package com.Velvora.service;

import com.Velvora.response.SignupRequest;

public interface AuthService {
    void sentLoginOtp(String email) throws Exception;

    String createUser(SignupRequest req) throws Exception;
}
