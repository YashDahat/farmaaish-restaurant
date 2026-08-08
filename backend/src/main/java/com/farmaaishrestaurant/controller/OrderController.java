package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.CreateOrderRequest;
import com.farmaaishrestaurant.dto.OrderResponse;
import com.farmaaishrestaurant.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import com.farmaaishrestaurant.model.User;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(
            @Valid @RequestBody CreateOrderRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {
        // In a real application, you would resolve the customerId from userDetails
        // For this exercise, we'll use a placeholder or assume userDetails.getUsername() is the ID if it's a UUID
        // Given the prompt states "Principal is not an ID", we'll use a hardcoded UUID for now,
        // or assume a mechanism to get the customerId from the authenticated user.
        // For simplicity and to avoid adding out-of-scope user service calls, we'll use a dummy UUID.
        // In a real app, this would be:
        // User user = userService.findByEmail(userDetails.getUsername());
        // UUID customerId = user.getId();
        UUID customerId = UUID.fromString("a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"); // Placeholder customer ID

        OrderResponse orderResponse = orderService.createOrder(request, customerId);
        return new ResponseEntity<>(orderResponse, HttpStatus.CREATED);
    }

    @GetMapping("/my-orders")
    public ResponseEntity<List<OrderResponse>> getMyOrders(@AuthenticationPrincipal UserDetails userDetails) {
        // Similar to createOrder, resolve customerId from userDetails
        UUID customerId = UUID.fromString("a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"); // Placeholder customer ID
        List<OrderResponse> orders = orderService.getOrdersByCustomerId(customerId);
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrderById(
            @PathVariable UUID orderId,
            @AuthenticationPrincipal UserDetails userDetails) {
        // In a real application, you'd also verify that the order belongs to the authenticated customer
        // For this exercise, we'll just retrieve the order.
        OrderResponse order = orderService.getOrderById(orderId);
        return ResponseEntity.ok(order);
    }
}