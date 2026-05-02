package com.Velvora.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.Velvora.config.JwtProvider;
import com.Velvora.domain.USER_ROLE;
import com.Velvora.model.Cart;
import com.Velvora.model.Seller;
import com.Velvora.model.User;
import com.Velvora.model.VerificationCode;
import com.Velvora.repository.CartRepository;
import com.Velvora.repository.SellerRepository;
import com.Velvora.repository.UserRepository;
import com.Velvora.repository.VerificationCodeRepository;
import com.Velvora.request.LoginRequest;
import com.Velvora.response.AuthResponse;
import com.Velvora.response.SignupRequest;
import com.Velvora.service.AuthService;
import com.Velvora.service.EmailService;
import com.Velvora.utils.OtpUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CartRepository cartRepository;
    private final JwtProvider jwtProvider;
    private final VerificationCodeRepository verificationCodeRepository;
    private final EmailService emailService;
    private final CustomUserServiceImpl customUserService;
    private final SellerRepository sellerRepository;

    @Override
    public void sentLoginOtp(String email, USER_ROLE role) throws Exception {
        String SIGNING_PREFIX="signing_";
//        String SELLER_PREFIX="seller_";

        if(email.startsWith(SIGNING_PREFIX)) {
            email = email.substring(SIGNING_PREFIX.length());

            if (role == null) {
                throw new Exception("Role is required for signing OTP");
            }

            if (USER_ROLE.ROLE_CUSTOMER.equals(role)) {
                User user = userRepository.findByEmail(email);
                if (user == null) {
                    throw new Exception("User not found with email: " + email);
                }
            } else if (USER_ROLE.ROLE_SELLER.equals(role)) {
                Seller seller = sellerRepository.findByEmail(email);
                if (seller == null) {
                    throw new Exception("Seller not found with email: " + email);
                }
            } else {
                throw new Exception("Invalid role for signing otp");
            }
        }





        List<VerificationCode> existingCodes = verificationCodeRepository.findAllByEmail(email);

        if(!existingCodes.isEmpty()){
            verificationCodeRepository.deleteAll(existingCodes);
        }

        String otp = OtpUtil.generateOtp();

        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setOtp(otp);
        verificationCode.setEmail(email);
        verificationCodeRepository.save(verificationCode);

        String subject = "Velvora OTP Verification";
        String text = "Your OTP for Velvora is: " + otp;

        emailService.sendVerificationEmail(email, otp, subject, text);

    }

    @Override
    public String createUser(SignupRequest req) throws Exception {

        VerificationCode verificationCode = verificationCodeRepository.findByEmailAndOtp(req.getEmail(), req.getOtp());

        if(verificationCode==null){
            throw new Exception("Wrong otp....");
        }

        User user = userRepository.findByEmail(req.getEmail());

        if(user == null){
            User createdUser = new User();
            createdUser.setEmail(req.getEmail());
            createdUser.setFullName(req.getFullName());
            createdUser.setRole(USER_ROLE.ROLE_CUSTOMER);
            createdUser.setMobile("8912453219");
            createdUser.setPassword(passwordEncoder.encode(req.getOtp()));
            user =userRepository.save(createdUser);

            Cart cart = new Cart();
            cart.setUser(user);
            cartRepository.save(cart);
        }

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add((new SimpleGrantedAuthority(USER_ROLE.ROLE_CUSTOMER.toString())));

        Authentication authentication = new UsernamePasswordAuthenticationToken(req.getEmail(), null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtProvider.generateToken(authentication);
    }

    @Override
    public AuthResponse signing(LoginRequest req) {
        String username = req.getEmail();
        String otp = req.getOtp();

        Authentication authentication = authenticate(username, otp);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Login success");

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        String roleName = authorities.isEmpty()?null:authorities.iterator().next().getAuthority();

        authResponse.setRole(USER_ROLE.valueOf(roleName));
        return authResponse;
    }

    private Authentication authenticate(String username, String otp) {
        UserDetails userDetails= customUserService.loadUserByUsername(username);

        String SELLER_PREFIX="seller_";
//        username = username.substring(SIGNING_PREFIX.length());
        if(username.startsWith(SELLER_PREFIX)){
            username=username.substring(SELLER_PREFIX.length());
        }

        if(userDetails==null){
            throw new BadCredentialsException("User not found with email: " + username);
        }
        VerificationCode verificationCode = verificationCodeRepository.findByEmailAndOtp(username, otp);

        if(verificationCode==null){
            throw new BadCredentialsException("Invalid OTP");
        }

        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
    }
}
