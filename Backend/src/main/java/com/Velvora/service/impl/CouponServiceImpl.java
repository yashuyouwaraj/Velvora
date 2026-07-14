package com.Velvora.service.impl;

import java.time.LocalDate;
import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import com.Velvora.model.Cart;
import com.Velvora.model.Coupon;
import com.Velvora.model.User;
import com.Velvora.repository.CartRepository;
import com.Velvora.repository.CouponRepository;
import com.Velvora.repository.UserRepository;
import com.Velvora.service.CouponService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CouponServiceImpl implements CouponService {
    private final CouponRepository couponRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;

    @Override
    public Cart applyCoupon(String code, double orderValue, User user) throws Exception {
        Coupon coupon = couponRepository.findByCode(code);

        Cart cart = cartRepository.findByUserId(user.getId());

        if (coupon == null) {
            throw new Exception("coupon not valid");
        }

        if (user.getUsedCoupons().contains(coupon)) {
            throw new Exception("coupon already used");
        }

        if (orderValue < coupon.getMinimumOrderValue()) {
            throw new Exception("valid for minimum order value " + coupon.getMinimumOrderValue());
        }

        if (coupon.getIsActive()
                && LocalDate.now().isAfter(coupon.getValidityStartDate())
                && LocalDate.now().isBefore(coupon.getValidityEndDate())) {
            user.getUsedCoupons().add(coupon);
            userRepository.save(user);

            double discountedPrice = (cart.getTotalSellingPrice() * coupon.getDiscountPercentage()) / 100;

            cart.setTotalSellingPrice(cart.getTotalSellingPrice() - discountedPrice);
            cart.setCouponCode(code);
            cartRepository.save(cart);

            return cart;
        }
        throw new Exception("coupon not valid");
    }

    @Override
    public Cart removeCoupon(String code, User user) throws Exception {
        Coupon coupon = couponRepository.findByCode(code);

        if(coupon==null){
            throw new Exception("coupon not found...");
        }
        Cart cart = cartRepository.findByUserId(user.getId());

        double discountedPrice = (cart.getTotalSellingPrice() * coupon.getDiscountPercentage()) / 100;

        cart.setTotalSellingPrice(cart.getTotalSellingPrice()+discountedPrice);

        cart.setCouponCode(null);

        return cartRepository.save(cart);
    }

    @Override
    public Coupon findCouponById(Long id) throws Exception {
        return couponRepository.findById(id).orElseThrow(()-> new Exception(("coupon not found")));
    }

    @Override
    @PreAuthorize("hasRole ('ADMIN')")
    public Coupon createCoupon(Coupon coupon) {
        return couponRepository.save(coupon);
    }

    @Override
    @PreAuthorize("hasRole ('ADMIN')")
    public Coupon updateCoupon(Long id, Coupon coupon) throws Exception {
        Coupon existingCoupon = couponRepository.findById(id)
                .orElseThrow(() -> new Exception("coupon not found"));

        if (coupon.getCode() != null) {
            existingCoupon.setCode(coupon.getCode());
        }
        if (coupon.getDiscountPercentage() != 0) {
            existingCoupon.setDiscountPercentage(coupon.getDiscountPercentage());
        }
        if (coupon.getValidityStartDate() != null) {
            existingCoupon.setValidityStartDate(coupon.getValidityStartDate());
        }
        if (coupon.getValidityEndDate() != null) {
            existingCoupon.setValidityEndDate(coupon.getValidityEndDate());
        }
        if (coupon.getMinimumOrderValue() != 0) {
            existingCoupon.setMinimumOrderValue(coupon.getMinimumOrderValue());
        }
        if (coupon.getIsActive() != null) {
            existingCoupon.setIsActive(coupon.getIsActive());
        }

        return couponRepository.save(existingCoupon);
    }

    @Override
    @PreAuthorize("hasRole ('ADMIN')")
    public List<Coupon> findAllCoupons() {
        return couponRepository.findAll();
    }

    @Override
    @PreAuthorize("hasRole ('ADMIN')")
    public void deleteCoupon(Long id) throws Exception {
        findCouponById(id);
        couponRepository.deleteById(id);
    }
}
