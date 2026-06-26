package com.Velvora.service;

import com.Velvora.model.Product;
import com.Velvora.model.User;
import com.Velvora.model.Wishlist;

public interface WishlistService {
    Wishlist createWishlist(User user);
    Wishlist getWishlistByUserId(User user);
    Wishlist addProductToWishlist(User user, Product product);
}
