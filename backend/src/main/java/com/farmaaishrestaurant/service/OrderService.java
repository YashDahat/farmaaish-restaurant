package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.CreateOrderRequest;
import com.farmaaishrestaurant.dto.OrderItemRequest;
import com.farmaaishrestaurant.dto.OrderResponse;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.MenuItem;
import com.farmaaishrestaurant.model.Order;
import com.farmaaishrestaurant.model.OrderItem;
import com.farmaaishrestaurant.model.OrderStatus;
import com.farmaaishrestaurant.repository.MenuItemRepository;
import com.farmaaishrestaurant.repository.OrderRepository;
import com.farmaaishrestaurant.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import com.farmaaishrestaurant.service.PaymentService;
import com.farmaaishrestaurant.dto.CreatePaymentRequest;
import com.farmaaishrestaurant.dto.PaymentOrderResponse;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final MenuItemRepository menuItemRepository;
    // private final PaymentService paymentService; // Assuming PaymentService is available

    @Autowired
    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository, MenuItemRepository menuItemRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.menuItemRepository = menuItemRepository;
        // this.paymentService = paymentService;
    }

    @Transactional
    public OrderResponse createOrder(CreateOrderRequest createOrderRequest) {
        Order order = new Order();
        order.setCustomerName(createOrderRequest.getCustomerName());
        order.setCustomerEmail(createOrderRequest.getCustomerEmail());
        order.setDeliveryAddress(createOrderRequest.getDeliveryAddress());
        order.setOrderStatus(OrderStatus.PENDING_PAYMENT);

        BigDecimal totalAmount = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();

        for (OrderItemRequest itemRequest : createOrderRequest.getOrderItems()) {
            MenuItem menuItem = menuItemRepository.findById(itemRequest.getMenuItemId())
                    .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with ID: " + itemRequest.getMenuItemId()));

            OrderItem orderItem = new OrderItem();
            orderItem.setMenuItemId(menuItem.getId());
            orderItem.setMenuItemName(menuItem.getName());
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setUnitPrice(menuItem.getPrice());
            orderItem.setOrder(order); // Set the back-reference

            orderItems.add(orderItem);
            totalAmount = totalAmount.add(menuItem.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity())));
        }

        order.setOrderItems(orderItems);
        order.setTotalAmount(totalAmount);

        Order savedOrder = orderRepository.save(order);
        // orderItems.forEach(orderItemRepository::save); // Cascade save should handle this

        // TODO: Integrate with PaymentService
        // CreatePaymentRequest paymentRequest = CreatePaymentRequest.builder()
        //         .orderId(savedOrder.getId())
        //         .amount(savedOrder.getTotalAmount())
        //         .currency("INR")
        //         .build();
        // PaymentOrderResponse paymentResponse = paymentService.createOrder(paymentRequest);
        // savedOrder.setOrderStatus(OrderStatus.PENDING_PAYMENT_VERIFICATION);
        // savedOrder.setPaymentTransactionId(paymentResponse.getTransactionId()); // Assuming transaction ID is available
        // savedOrder = orderRepository.save(savedOrder);

        return mapToOrderResponse(savedOrder);
    }

    public OrderResponse getOrderById(UUID orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));
        return mapToOrderResponse(order);
    }

    @Transactional
    public OrderResponse updateOrderStatus(UUID orderId, OrderStatus newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));
        order.setOrderStatus(newStatus);
        Order updatedOrder = orderRepository.save(order);
        return mapToOrderResponse(updatedOrder);
    }

    private OrderResponse mapToOrderResponse(Order order) {
        return OrderResponse.builder()
                .id(order.getId())
                .customerName(order.getCustomerName())
                .customerEmail(order.getCustomerEmail())
                .deliveryAddress(order.getDeliveryAddress())
                .totalAmount(order.getTotalAmount())
                .orderStatus(order.getOrderStatus())
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .orderItems(order.getOrderItems().stream()
                        .map(this::mapOrderItemToOrderItem)
                        .collect(Collectors.toList()))
                .build();
    }

    private com.farmaaishrestaurant.model.OrderItem mapOrderItemToOrderItem(OrderItem orderItem) {
        // This method is to ensure the OrderItem in OrderResponse is the model.OrderItem
        // and not a DTO, as per the OrderResponse DTO definition.
        return orderItem;
    }
}