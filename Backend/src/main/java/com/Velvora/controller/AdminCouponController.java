package com.Velvora.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Velvora.model.Cart;
import com.Velvora.model.Coupon;
import com.Velvora.model.User;
import com.Velvora.service.CouponService;
import com.Velvora.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/coupons")
public class AdminCouponController {
    private final CouponService couponService;
    private final UserService userService;

    @PostMapping("/apply")
    public ResponseEntity<Cart> applyCoupon(
            @RequestParam String apply,
            @RequestParam String code,
            @RequestParam double orderValue,
            @RequestHeader("Authorization") String jwt
    ) throws Exception{
        User user = userService.findUserByJwtToken(jwt);

        Cart cart;

        if(apply.equals("true")){
            cart = couponService.applyCoupon(code, orderValue, user);
        } else{
            cart = couponService.removeCoupon(code, user);
        }

        return ResponseEntity.ok(cart);
    }

    //Admin Operations
    @PostMapping("/admin/create")
    public  ResponseEntity createCoupon(@RequestBody Coupon coupon){
        Coupon createdCoupon = couponService.createCoupon(coupon);
        return ResponseEntity.ok(createdCoupon);
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<?> deleteCoupon(@PathVariable Long id) throws Exception{
        couponService.deleteCoupon(id);
        return ResponseEntity.ok("Coupon deleted successfully");
    }

    @PatchMapping("/admin/{id}")
    public ResponseEntity<Coupon> updateCoupon(
            @PathVariable Long id,
            @RequestBody Coupon coupon
    ) throws Exception {
        Coupon updatedCoupon = couponService.updateCoupon(id, coupon);
        return ResponseEntity.ok(updatedCoupon);
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<Coupon>> getAllCoupons(){
        List<Coupon> coupons = couponService.findAllCoupons();
        return ResponseEntity.ok(coupons);
    }

}
