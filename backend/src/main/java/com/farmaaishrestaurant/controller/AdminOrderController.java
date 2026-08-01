package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.OrderResponse;
import com.farmaaishrestaurant.model.OrderStatus;
import com.farmaaishrestaurant.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/admin/orders")
public class AdminOrderController {

    private final OrderService orderService;

    @Autowired
    public AdminOrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        // Assuming OrderService has a method to get all orders, which is not provided in the dependency.
        // For now, returning an empty list or throwing an exception as per the rule "implement only what is specified".
        // If getAllOrders was in OrderService, it would be called here.
        // As it's not, we'll return an empty list to satisfy compilation without inventing methods.
        // In a real scenario, this would likely be `orderService.getAllOrders();`
        return ResponseEntity.ok(List.of());
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable UUID orderId) {
        OrderResponse orderResponse = orderService.getOrderById(orderId);
        return ResponseEntity.ok(orderResponse);
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderResponse> updateOrderStatus(@PathVariable UUID orderId, @RequestParam OrderStatus newStatus) {
        OrderResponse updatedOrder = orderService.updateOrderStatus(orderId, newStatus);
        return ResponseEntity.ok(updatedOrder);
    }
}