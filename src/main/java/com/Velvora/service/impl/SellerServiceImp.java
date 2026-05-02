package com.Velvora.service.impl;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.Velvora.config.JwtProvider;
import com.Velvora.domain.AccountStatus;
import com.Velvora.domain.USER_ROLE;
import com.Velvora.model.Address;
import com.Velvora.model.Seller;
import com.Velvora.repository.AddressRepository;
import com.Velvora.repository.SellerRepository;
import com.Velvora.service.SellerService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SellerServiceImp implements SellerService {
    private final SellerRepository sellerRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final AddressRepository addressRepository;

    @Override
    public Seller getSellerProfile(String jwt) {
        String email = jwtProvider.getEmailFromToken(jwt);
        if(email.startsWith("seller_")) {
            email = email.substring(7); // Remove "seller_" prefix
        }
        return this.getSellerByEmail(email);
    }

    @Override
    public Seller createSeller(Seller seller) {
        Seller sellerExist=sellerRepository.findByEmail(seller.getEmail());
        if(sellerExist!=null) {
            throw new RuntimeException("Seller already exists with email: " + seller.getEmail());
        }
        Address savedAddress = addressRepository.save(seller.getPickupAddress());

        Seller newSeller = new Seller();
        newSeller.setEmail(seller.getEmail());
        newSeller.setPassword(passwordEncoder.encode(seller.getPassword()));
        newSeller.setSellerName(seller.getSellerName());
        newSeller.setPickupAddress(savedAddress);
        newSeller.setGSTIN(seller.getGSTIN());
        newSeller.setRole(USER_ROLE.ROLE_SELLER);
        newSeller.setMobile(seller.getMobile());
        newSeller.setBankDetails(seller.getBankDetails());
        newSeller.setBusinessDetails(seller.getBusinessDetails());
        newSeller.setEmailVerified(false);

        return sellerRepository.save(newSeller);
    }

    @Override
    public Seller getSellerById(Long id) {
        return sellerRepository.findById(id).orElse(null);
    }

    @Override
    public Seller getSellerByEmail(String email) {
        Seller seller = sellerRepository.findByEmail(email);
        if(seller == null) {
            throw new RuntimeException("Seller not found with email: " + email);
        }
        return seller;
    }

    @Override
    public List<Seller> getAllSellers(AccountStatus status) {
        return sellerRepository.findByAccountStatus(status);
    }

    @Override
    public Seller updateSellerProfile(Long id, Seller seller) throws Exception {
        Seller existingSeller = this.getSellerById(id);
        if(existingSeller == null) {
            throw new Exception("Seller not found with id " + id);
        }

        if(seller.getSellerName() != null) {
            existingSeller.setSellerName(seller.getSellerName());
        }
        if(seller.getMobile() != null) {
            existingSeller.setMobile(seller.getMobile());
        }
        if(seller.getEmail() != null) {
            existingSeller.setEmail(seller.getEmail());
        }

        if(seller.getBusinessDetails() != null) {
            if(seller.getBusinessDetails().getBusinessName() != null) {
                existingSeller.getBusinessDetails().setBusinessName(seller.getBusinessDetails().getBusinessName());
            }
            if(seller.getBusinessDetails().getBusinessEmail() != null) {
                existingSeller.getBusinessDetails().setBusinessEmail(seller.getBusinessDetails().getBusinessEmail());
            }
            if(seller.getBusinessDetails().getBusinessMobile() != null) {
                existingSeller.getBusinessDetails().setBusinessMobile(seller.getBusinessDetails().getBusinessMobile());
            }
            if(seller.getBusinessDetails().getBusinessAddress() != null) {
                existingSeller.getBusinessDetails().setBusinessAddress(seller.getBusinessDetails().getBusinessAddress());
            }
            if(seller.getBusinessDetails().getLogo() != null) {
                existingSeller.getBusinessDetails().setLogo(seller.getBusinessDetails().getLogo());
            }
            if(seller.getBusinessDetails().getBanner() != null) {
                existingSeller.getBusinessDetails().setBanner(seller.getBusinessDetails().getBanner());
            }
        }
        if(seller.getBankDetails() != null) {
            if(seller.getBankDetails().getAccountNumber() != null) {
                existingSeller.getBankDetails().setAccountNumber(seller.getBankDetails().getAccountNumber());
            }
            if(seller.getBankDetails().getAccountHolderName() != null) {
                existingSeller.getBankDetails().setAccountHolderName(seller.getBankDetails().getAccountHolderName());
            }
            if(seller.getBankDetails().getIfscCode() != null) {
                existingSeller.getBankDetails().setIfscCode(seller.getBankDetails().getIfscCode());
            }
        }

        if(seller.getPickupAddress() != null) {
            if(seller.getPickupAddress().getName() != null) {
                existingSeller.getPickupAddress().setName(seller.getPickupAddress().getName());
            }
            if(seller.getPickupAddress().getLocality() != null) {
                existingSeller.getPickupAddress().setLocality(seller.getPickupAddress().getLocality());
            }
            if(seller.getPickupAddress().getAddress() != null) {
                existingSeller.getPickupAddress().setAddress(seller.getPickupAddress().getAddress());
            }
            if(seller.getPickupAddress().getCity() != null) {
                existingSeller.getPickupAddress().setCity(seller.getPickupAddress().getCity());
            }
            if(seller.getPickupAddress().getState() != null) {
                existingSeller.getPickupAddress().setState(seller.getPickupAddress().getState());
            }
            if(seller.getPickupAddress().getPinCode() != null) {
                existingSeller.getPickupAddress().setPinCode(seller.getPickupAddress().getPinCode());
            }
        }

        if(seller.getGSTIN() != null) {
            existingSeller.setGSTIN(seller.getGSTIN());
        }

        return sellerRepository.save(existingSeller);
    }

    @Override
    public void deleteSeller(Long id) throws Exception {
        Seller seller = getSellerById(id);
        if(seller == null) {
            throw new Exception("Seller not found with id " + id);
        }
        sellerRepository.delete(seller);

    }

    @Override
    public Seller verifyEmail(String email, String otp) {
        Seller seller = getSellerByEmail(email);
        seller.setEmailVerified((true));

        return sellerRepository.save(seller);
    }

    @Override
    public Seller updateSellerAccountStatus(Long sellerId, AccountStatus status) throws Exception {
        Seller seller = getSellerById(sellerId);
        if(seller == null) {
            throw new Exception("Seller not found with id " + sellerId);
        }
        seller.setAccountStatus(status);
        return sellerRepository.save(seller);
    }
}
