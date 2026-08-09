package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.CreateOrderRequest;
import com.farmaaishrestaurant.dto.OrderDto;
import com.farmaaishrestaurant.dto.OrderItemRequest;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.Order;
import com.farmaaishrestaurant.model.OrderItem;
import com.farmaaishrestaurant.model.OrderStatus;
import com.farmaaishrestaurant.model.MenuItem;
import com.farmaaishrestaurant.repository.MenuItemRepository;
import com.farmaaishrestaurant.repository.OrderItemRepository;
import com.farmaaishrestaurant.repository.OrderRepository;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.farmaaishrestaurant.service.PaymentService;
import com.farmaaishrestaurant.event.PaymentCapturedEvent;
import com.farmaaishrestaurant.dto.CreatePaymentRequest;
import com.farmaaishrestaurant.dto.OrderItemDto;
import com.farmaaishrestaurant.dto.PaymentOrderResponse;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final MenuItemRepository menuItemRepository;
    private final PaymentService paymentService;

    public OrderService(OrderRepository orderRepository,
                        OrderItemRepository orderItemRepository,
                        MenuItemRepository menuItemRepository,
                        PaymentService paymentService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.menuItemRepository = menuItemRepository;
        this.paymentService = paymentService;
    }

    @Transactional
    public OrderDto createOrder(CreateOrderRequest request) {
        BigDecimal totalAmount = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();

        Order order = new Order();
        order.setUserId(UUID.fromString(String.valueOf(request.getUserId()))); // Assuming userId is passed as Integer and needs conversion
        order.setStatus(OrderStatus.PENDING_PAYMENT);
        order.setOrderDate(Instant.now());

        for (OrderItemRequest itemRequest : request.getItems()) {
            MenuItem menuItem = menuItemRepository.findById(itemRequest.getMenuItemId())
                    .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with ID: " + itemRequest.getMenuItemId()));

            BigDecimal subTotal = menuItem.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity()));
            totalAmount = totalAmount.add(subTotal);

            OrderItem orderItem = new OrderItem();
            orderItem.setMenuItem(menuItem);
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setSubTotal(subTotal);
            orderItem.setOrder(order); // Set the back-reference
            orderItems.add(orderItem);
        }

        order.setTotalAmount(totalAmount);
        order.setOrderItems(orderItems); // Set the collection on the parent

        Order savedOrder = orderRepository.save(order);
        orderItems.forEach(orderItemRepository::save); // Save order items after order is saved

        CreatePaymentRequest paymentRequest = new CreatePaymentRequest(
                totalAmount, "INR", "order_" + savedOrder.getId().toString());
        PaymentOrderResponse paymentResponse = paymentService.createOrder(paymentRequest);

        savedOrder.setGatewayOrderId(paymentResponse.getGatewayOrderId());
        orderRepository.save(savedOrder);

        return mapToOrderDto(savedOrder);
    }

    public OrderDto getOrderById(UUID orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));
        return mapToOrderDto(order);
    }

    public List<OrderDto> getOrdersByUserId(UUID userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return orders.stream()
                .map(this::mapToOrderDto)
                .collect(Collectors.toList());
    }

    public List<OrderDto> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(this::mapToOrderDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderDto updateOrderStatus(UUID orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));
        order.setStatus(status);
        Order updatedOrder = orderRepository.save(order);
        return mapToOrderDto(updatedOrder);
    }

    @EventListener
    @Transactional
    public void handlePaymentCapturedEvent(PaymentCapturedEvent event) {
        String referenceId = event.getReferenceId();
        if (referenceId != null && referenceId.startsWith("order_")) {
            try {
                UUID orderId = UUID.fromString(referenceId.substring("order_".length()));
                orderRepository.findById(orderId).ifPresent(order -> {
                    if (order.getStatus() == OrderStatus.PENDING_PAYMENT) {
                        order.setStatus(OrderStatus.RECEIVED);
                        orderRepository.save(order);
                    }
                });
            } catch (IllegalArgumentException e) {
                System.err.println("Invalid order UUID in referenceId: " + referenceId);
            }
        }
    }

    private OrderDto mapToOrderDto(Order order) {
        List<OrderItemDto> itemDtos = order.getOrderItems().stream()
                .map(this::mapToOrderItemDto)
                .collect(Collectors.toList());

        return OrderDto.builder()
                .id(order.getId())
                .userId(Integer.valueOf(order.getUserId().toString())) // Assuming userId needs to be Integer in DTO
                .orderItems(itemDtos)
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .gatewayOrderId(order.getGatewayOrderId())
                .createdAt(order.getOrderDate())
                .build();
    }

    private OrderItemDto mapToOrderItemDto(OrderItem orderItem) {
        return OrderItemDto.builder()
                .menuItemId(orderItem.getMenuItem().getId())
                .menuItemName(orderItem.getMenuItem().getName())
                .quantity(orderItem.getQuantity())
                .subTotal(orderItem.getSubTotal())
                .build();
    }
}