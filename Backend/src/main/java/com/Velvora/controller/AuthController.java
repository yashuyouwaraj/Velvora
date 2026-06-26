package com.Velvora.controller;

import com.Velvora.domain.USER_ROLE;
import com.Velvora.model.User;
import com.Velvora.model.VerificationCode;
import com.Velvora.repository.UserRepository;
import com.Velvora.request.LoginOtpRequest;
import com.Velvora.request.LoginRequest;
import com.Velvora.response.ApiResponse;
import com.Velvora.response.AuthResponse;
import com.Velvora.response.SignupRequest;
import com.Velvora.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepository;
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody SignupRequest req) throws Exception {
        String jwt=authService.createUser(req);
        AuthResponse res = new AuthResponse();
        res.setJwt(jwt);
        res.setMessage("Registration successfully");
        res.setRole(USER_ROLE.ROLE_CUSTOMER);

        return ResponseEntity.ok(res);
    }

    @PostMapping("/sent/login-signup-otp")
    public ResponseEntity<ApiResponse> sendOtpHandler(@RequestBody LoginOtpRequest req) throws Exception {
        authService.sentLoginOtp(req.getEmail(),req.getRole());

        ApiResponse res = new ApiResponse();

        res.setMessage("OTP sent successfully to "+req.getEmail());

        return ResponseEntity.ok(res);
    }

    @PostMapping("/signing")
    public ResponseEntity<AuthResponse> loginHandler(@RequestBody LoginRequest req){
        AuthResponse authResponse = authService.signing(req);

        return ResponseEntity.ok(authResponse);
    }

}
