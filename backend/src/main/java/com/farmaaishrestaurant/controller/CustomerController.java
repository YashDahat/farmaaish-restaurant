package com.farmaaishrestaurant.controller;

import com.farmaaishrestaurant.dto.CustomerDto;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.Order;
import com.farmaaishrestaurant.service.CustomerService;
import com.farmaaishrestaurant.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {

    private final CustomerService customerService;
    private final OrderService orderService;

    public CustomerController(CustomerService customerService, OrderService orderService) {
        this.customerService = customerService;
        this.orderService = orderService;
    }

    @GetMapping("/profile")
    public ResponseEntity<CustomerDto> getCustomerProfile(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            UUID userId = UUID.fromString(userDetails.getUsername()); // Assuming username is userId
            CustomerDto customerDto = customerService.getCustomerByUserId(userId);
            return ResponseEntity.ok(customerDto);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<CustomerDto> updateCustomerProfile(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody CustomerDto customerDto) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            UUID userId = UUID.fromString(userDetails.getUsername()); // Assuming username is userId
            CustomerDto existingCustomer = customerService.getCustomerByUserId(userId);
            CustomerDto updatedCustomer = customerService.updateCustomer(existingCustomer.getId(), customerDto);
            return ResponseEntity.ok(updatedCustomer);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/profile/orders")
    public ResponseEntity<List<Order>> getCustomerOrders(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            UUID userId = UUID.fromString(userDetails.getUsername()); // Assuming username is userId
            CustomerDto customerDto = customerService.getCustomerByUserId(userId);
            List<Order> orders = orderService.getOrdersByCustomerId(customerDto.getId());
            return ResponseEntity.ok(orders);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}