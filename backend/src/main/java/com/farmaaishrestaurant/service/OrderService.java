package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.CreateOrderRequest;
import com.farmaaishrestaurant.dto.OrderItemRequest;
import com.farmaaishrestaurant.dto.MenuItemDto;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.Order;
import com.farmaaishrestaurant.model.OrderItem;
import com.farmaaishrestaurant.model.OrderStatus;
import com.farmaaishrestaurant.repository.MenuItemRepository;
import com.farmaaishrestaurant.repository.OrderItemRepository;
import com.farmaaishrestaurant.repository.OrderRepository;
import com.farmaaishrestaurant.service.MenuService;
import com.farmaaishrestaurant.service.PaymentService;
import com.farmaaishrestaurant.dto.CreatePaymentRequest;
import com.farmaaishrestaurant.dto.PaymentOrderResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final MenuService menuService;
    private final PaymentService paymentService;

    @Autowired
    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository, MenuService menuService, PaymentService paymentService) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.menuService = menuService;
        this.paymentService = paymentService;
    }

    @Transactional
    public Order createOrder(CreateOrderRequest request) {
        if (request.getOrderItems() == null || request.getOrderItems().isEmpty()) {
            throw new IllegalArgumentException("Order must contain at least one item.");
        }

        Order order = new Order();
        order.setCustomerId(request.getCustomerId());
        order.setDeliveryAddress(request.getDeliveryAddress());
        order.setContactPhone(request.getContactPhone());
        order.setStatus(OrderStatus.PENDING_PAYMENT);

        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderItemRequest itemRequest : request.getOrderItems()) {
            MenuItemDto menuItem = menuService.getMenuItemById(itemRequest.getMenuItemId());
            if (menuItem == null) {
                throw new ResourceNotFoundException("Menu item not found with ID: " + itemRequest.getMenuItemId());
            }

            BigDecimal subTotal = menuItem.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity()));
            totalAmount = totalAmount.add(subTotal);

            OrderItem orderItem = new OrderItem();
            orderItem.setMenuItemId(menuItem.getId());
            orderItem.setMenuItemName(menuItem.getName());
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setUnitPrice(menuItem.getPrice());
            orderItem.setSubTotal(subTotal);
            orderItem.setOrder(order);
            orderItems.add(orderItem);
        }

        order.setTotalAmount(totalAmount);
        order.setOrderItems(orderItems); // This also sets the back-reference

        Order savedOrder = orderRepository.save(order);

        CreatePaymentRequest createPaymentRequest = CreatePaymentRequest.builder()
                .referenceId(savedOrder.getId().toString())
                .amount(savedOrder.getTotalAmount())
                .currency("USD")
                .build();

        PaymentOrderResponse paymentResponse = paymentService.createOrder(createPaymentRequest);

        savedOrder.setPaymentOrderId(paymentResponse.getGatewayOrderId());
        savedOrder.setPaymentLink(null);

        return orderRepository.save(savedOrder);
    }

    public Order getOrderById(UUID orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Transactional
    public Order updateOrderStatus(UUID orderId, OrderStatus newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with ID: " + orderId));
        order.setStatus(newStatus);
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByCustomerId(UUID customerId) {
        return orderRepository.findByCustomerId(customerId);
    }

    public List<Order> getOrdersByStatus(OrderStatus status) {
        return orderRepository.findByStatus(status);
    }
}