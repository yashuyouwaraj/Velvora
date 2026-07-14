package com.Velvora.service;

import java.util.List;

import com.Velvora.model.Cart;
import com.Velvora.model.Coupon;
import com.Velvora.model.User;

public interface CouponService {
    Cart applyCoupon(String code, double orderValue, User user) throws Exception;
    Cart removeCoupon(String code, User user) throws Exception;
    Coupon findCouponById(Long id) throws Exception;
    Coupon createCoupon(Coupon coupon);
    Coupon updateCoupon(Long id, Coupon coupon) throws Exception;
    List<Coupon> findAllCoupons();
    void deleteCoupon(Long id) throws Exception;
}
