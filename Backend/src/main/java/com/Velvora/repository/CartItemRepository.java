package com.Velvora.repository;

import com.Velvora.model.Cart;
import com.Velvora.model.CartItem;
import com.Velvora.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    CartItem findByCartAndProductAndSize(Cart cart, Product product, String size);
}
