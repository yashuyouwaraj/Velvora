package com.Velvora.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Velvora.model.VerificationCode;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode,Long> {
    VerificationCode findByEmail(String email);
    VerificationCode findByOtp(String otp);
    List<VerificationCode> findAllByEmail(String email);
    VerificationCode findByEmailAndOtp(String email, String otp);
}
