package com.Velvora.repository;

import com.Velvora.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerRepository extends JpaRepository<Seller, Long> {
     Seller findByEmail(String email);
}
