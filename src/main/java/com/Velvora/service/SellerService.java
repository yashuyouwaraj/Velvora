package com.Velvora.service;

import java.util.List;

import com.Velvora.domain.AccountStatus;
import com.Velvora.model.Seller;

public interface SellerService {
    Seller getSellerProfile(String jwt);
    Seller createSeller(Seller seller);
    Seller getSellerById(Long id);
    Seller getSellerByEmail(String email);
    List<Seller> getAllSellers(AccountStatus status);
    Seller updateSellerProfile(Long id, Seller seller) throws Exception;
    void deleteSeller(Long id) throws Exception;
    Seller verifyEmail(String email, String otp);
    Seller updateSellerAccountStatus(Long sellerId, AccountStatus status) throws Exception;
}
