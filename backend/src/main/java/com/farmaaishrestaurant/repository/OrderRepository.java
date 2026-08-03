package com.farmaaishrestaurant.repository;

import com.farmaaishrestaurant.model.Order;
import com.farmaaishrestaurant.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    List<Order> findByCustomerId(UUID customerId);
    List<Order> findByCustomerIdAndStatus(UUID customerId, OrderStatus status);
}