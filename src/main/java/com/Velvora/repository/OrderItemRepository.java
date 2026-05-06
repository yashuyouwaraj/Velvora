package com.Velvora.repository;

import com.Velvora.model.Order;
import com.Velvora.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
}
