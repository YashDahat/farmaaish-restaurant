package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.CreateOrderRequest;
import com.farmaaishrestaurant.dto.OrderItemRequest;
import com.farmaaishrestaurant.dto.OrderItemResponse;
import com.farmaaishrestaurant.dto.OrderResponse;
import com.farmaaishrestaurant.model.Order;
import com.farmaaishrestaurant.model.OrderItem;
import com.farmaaishrestaurant.model.OrderStatus;
import com.farmaaishrestaurant.model.MenuItem;
import com.farmaaishrestaurant.repository.MenuItemRepository;
import com.farmaaishrestaurant.repository.OrderRepository;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final MenuItemRepository menuItemRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, MenuItemRepository menuItemRepository) {
        this.orderRepository = orderRepository;
        this.menuItemRepository = menuItemRepository;
    }

    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request) {
        Order order = new Order();
        order.setCustomerId(UUID.randomUUID()); // Placeholder for actual customer ID
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING_PAYMENT);
        order.setDeliveryAddress(request.getDeliveryAddress());
        order.setContactNumber(request.getCustomerPhone());
        // Special instructions not in request, leaving null

        BigDecimal totalOrderPrice = BigDecimal.ZERO;
        List<OrderItem> orderItems = request.getOrderItems().stream().map(itemRequest -> {
            MenuItem menuItem = menuItemRepository.findById(itemRequest.getMenuItemId())
                    .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with ID: " + itemRequest.getMenuItemId()));

            OrderItem orderItem = new OrderItem();
            orderItem.setMenuItemId(menuItem.getId());
            orderItem.setName(menuItem.getName());
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setPrice(menuItem.getPrice());
            orderItem.setOrder(order); // Set the back-reference
            return orderItem;
        }).collect(Collectors.toList());

        for (OrderItem item : orderItems) {
            totalOrderPrice = totalOrderPrice.add(item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        }

        order.setOrderItems(orderItems);
        order.setTotalPrice(totalOrderPrice);

        Order savedOrder = orderRepository.save(order);

        return mapToOrderResponse(savedOrder, request.getCustomerName(), request.getCustomerPhone());
    }

    public OrderResponse getOrderById(UUID id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + id));
        // Customer name and phone are not stored in Order entity, using placeholders for now
        return mapToOrderResponse(order, "Unknown Customer", "Unknown Phone");
    }

    private OrderResponse mapToOrderResponse(Order order, String customerName, String customerPhone) {
        List<OrderItemResponse> itemResponses = order.getOrderItems().stream()
                .map(this::mapToOrderItemResponse)
                .collect(Collectors.toList());

        return OrderResponse.builder()
                .id(order.getId())
                .orderItems(itemResponses)
                .totalAmount(order.getTotalPrice())
                .status(order.getStatus())
                .customerName(customerName)
                .customerPhone(customerPhone)
                .deliveryAddress(order.getDeliveryAddress())
                .createdAt(order.getOrderDate())
                .updatedAt(order.getOrderDate()) // Assuming orderDate is also the creation date for simplicity
                .build();
    }

    private OrderItemResponse mapToOrderItemResponse(OrderItem orderItem) {
        return OrderItemResponse.builder()
                .id(orderItem.getId())
                .menuItemId(orderItem.getMenuItemId())
                .name(orderItem.getName())
                .quantity(orderItem.getQuantity())
                .unitPrice(orderItem.getPrice())
                .build();
    }
}