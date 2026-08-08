package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.*;
import com.farmaaishrestaurant.exception.OrderProcessingException;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.Order;
import com.farmaaishrestaurant.model.OrderItem;
import com.farmaaishrestaurant.model.OrderStatus;
import com.farmaaishrestaurant.repository.OrderItemRepository;
import com.farmaaishrestaurant.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import com.farmaaishrestaurant.service.MenuService;
import com.farmaaishrestaurant.service.PaymentService;
import com.farmaaishrestaurant.dto.OrderResponse;
import com.farmaaishrestaurant.dto.CreateOrderRequest;
import com.farmaaishrestaurant.dto.OrderItemRequest;
import com.farmaaishrestaurant.dto.MenuItemDto;
import com.farmaaishrestaurant.dto.CreatePaymentRequest;
import com.farmaaishrestaurant.model.Payment;
import com.farmaaishrestaurant.dto.UpdateOrderStatusRequest;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final MenuService menuService;
    private final PaymentService paymentService;

    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository, MenuService menuService, PaymentService paymentService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.menuService = menuService;
        this.paymentService = paymentService;
    }

    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request, UUID customerId) {
        if (request.getOrderItems() == null || request.getOrderItems().isEmpty()) {
            throw new OrderProcessingException("Order must contain at least one item.");
        }

        BigDecimal totalAmount = BigDecimal.ZERO;
        List<OrderItem> orderItems = new java.util.ArrayList<>();

        for (OrderItemRequest itemRequest : request.getOrderItems()) {
            MenuItemDto menuItem = menuService.getMenuItemById(itemRequest.getMenuItemId());
            if (menuItem == null) {
                throw new ResourceNotFoundException("Menu item with ID " + itemRequest.getMenuItemId() + " not found.");
            }
            if (itemRequest.getQuantity() <= 0) {
                throw new OrderProcessingException("Quantity for menu item " + menuItem.getName() + " must be positive.");
            }

            BigDecimal itemPrice = menuItem.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity()));
            totalAmount = totalAmount.add(itemPrice);

            OrderItem orderItem = new OrderItem();
            orderItem.setMenuItemId(menuItem.getId());
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setPrice(menuItem.getPrice());
            orderItems.add(orderItem);
        }

        Order order = new Order();
        order.setCustomerId(customerId);
        order.setTotalAmount(totalAmount);
        order.setStatus(OrderStatus.PENDING);
        order.setOrderDate(LocalDateTime.now());
        order.setOrderItems(orderItems);

        orderItems.forEach(item -> item.setOrder(order));

        Order savedOrder = orderRepository.save(order);

        try {
            paymentService.createOrder(new CreatePaymentRequest(totalAmount, "INR", "order_" + savedOrder.getId()));
            savedOrder.setStatus(OrderStatus.CONFIRMED);
            orderRepository.save(savedOrder);
        } catch (Exception e) {
            throw new OrderProcessingException("Payment failed for order " + savedOrder.getId(), e);
        }

        return mapToOrderResponse(savedOrder, request.getDeliveryAddress(), request.getContactPhone());
    }

    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(order -> mapToOrderResponse(order, null, null))
                .collect(Collectors.toList());
    }

    public List<OrderResponse> getOrdersByCustomerId(UUID customerId) {
        return orderRepository.findByCustomerId(customerId).stream()
                .map(order -> mapToOrderResponse(order, null, null))
                .collect(Collectors.toList());
    }

    public OrderResponse getOrderById(UUID orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order with ID " + orderId + " not found."));
        return mapToOrderResponse(order, null, null);
    }

    @Transactional
    public OrderResponse updateOrderStatus(UUID orderId, UpdateOrderStatusRequest request) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order with ID " + orderId + " not found."));

        order.setStatus(request.getNewStatus());
        Order updatedOrder = orderRepository.save(order);
        return mapToOrderResponse(updatedOrder, null, null);
    }

    private OrderResponse mapToOrderResponse(Order order, String deliveryAddress, String contactPhone) {
        List<OrderItemResponse> itemResponses = order.getOrderItems().stream()
                .map(this::mapToOrderItemResponse)
                .collect(Collectors.toList());

        return OrderResponse.builder()
                .id(order.getId())
                .customerId(order.getCustomerId())
                .orderDate(order.getOrderDate())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .deliveryAddress(deliveryAddress)
                .contactPhone(contactPhone)
                .orderItems(itemResponses)
                .build();
    }

    private OrderItemResponse mapToOrderItemResponse(OrderItem orderItem) {
        MenuItemDto menuItem = menuService.getMenuItemById(orderItem.getMenuItemId());
        return OrderItemResponse.builder()
                .id(orderItem.getId())
                .menuItemId(orderItem.getMenuItemId())
                .menuItemName(menuItem != null ? menuItem.getName() : "Unknown Item")
                .quantity(orderItem.getQuantity())
                .price(orderItem.getPrice())
                .build();
    }
}