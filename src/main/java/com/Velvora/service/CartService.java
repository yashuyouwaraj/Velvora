package com.Velvora.service;

import com.Velvora.model.Cart;
import com.Velvora.model.CartItem;
import com.Velvora.model.Product;
import com.Velvora.model.User;

public interface CartService {
    public CartItem addCartItem(User user, Product product, String size, int quantity);
    public Cart findUserCart(User user);
}
