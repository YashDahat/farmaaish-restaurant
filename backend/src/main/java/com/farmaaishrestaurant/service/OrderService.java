package com.farmaaishrestaurant.service;

import com.farmaaishrestaurant.dto.CreateOrderRequest;
import com.farmaaishrestaurant.dto.OrderItemRequest;
import com.farmaaishrestaurant.dto.OrderResponse;
import com.farmaaishrestaurant.dto.OrderItemResponse;
import com.farmaaishrestaurant.dto.MenuItemDto;
import com.farmaaishrestaurant.exception.ResourceNotFoundException;
import com.farmaaishrestaurant.model.Order;
import com.farmaaishrestaurant.model.OrderItem;
import com.farmaaishrestaurant.model.OrderStatus;
import com.farmaaishrestaurant.repository.OrderRepository;
import com.farmaaishrestaurant.service.PaymentService;
import com.farmaaishrestaurant.service.MenuService;
import com.farmaaishrestaurant.dto.CreatePaymentRequest;
import com.farmaaishrestaurant.dto.PaymentOrderResponse;
import com.farmaaishrestaurant.event.PaymentCapturedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private static final Logger log = LoggerFactory.getLogger(OrderService.class);

    private final OrderRepository orderRepository;
    private final MenuService menuService;
    private final PaymentService paymentService;

    public OrderService(OrderRepository orderRepository, MenuService menuService, PaymentService paymentService) {
        this.orderRepository = orderRepository;
        this.menuService = menuService;
        this.paymentService = paymentService;
    }

    @Transactional
    public OrderResponse createOrder(CreateOrderRequest request) {
        if (request.getCustomerId() == null) {
            throw new IllegalArgumentException("Customer ID must be provided.");
        }

        Order order = new Order();
        order.setCustomerId(UUID.fromString(String.valueOf(request.getCustomerId())));
        order.setCustomerName(request.getCustomerName());
        order.setCustomerPhone(request.getCustomerPhone());
        order.setDeliveryAddress(request.getDeliveryAddress());
        order.setNotes(request.getNotes());
        order.setStatus(OrderStatus.PENDING_PAYMENT);

        BigDecimal totalAmount = BigDecimal.ZERO;
        for (OrderItemRequest itemRequest : request.getOrderItems()) {
            MenuItemDto menuItem = menuService.getMenuItemById(itemRequest.getMenuItemId());
            if (menuItem == null) {
                throw new ResourceNotFoundException("Menu item with ID " + itemRequest.getMenuItemId() + " not found.");
            }

            OrderItem orderItem = new OrderItem();
            orderItem.setMenuItemId(UUID.fromString(String.valueOf(menuItem.getId())));
            orderItem.setMenuItemName(menuItem.getName());
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setUnitPrice(menuItem.getPrice());
            BigDecimal subTotal = menuItem.getPrice().multiply(BigDecimal.valueOf(itemRequest.getQuantity()));
            orderItem.setSubTotal(subTotal);
            order.addOrderItem(orderItem);
            totalAmount = totalAmount.add(subTotal);
        }

        order.setTotalAmount(totalAmount);
        Order savedOrder = orderRepository.save(order);

        CreatePaymentRequest createPaymentRequest = CreatePaymentRequest.builder()
                .amount(savedOrder.getTotalAmount())
                .currency("INR")
                .referenceId("order_" + savedOrder.getId())
                .build();

        PaymentOrderResponse paymentOrderResponse = paymentService.createOrder(createPaymentRequest);

        savedOrder.setGatewayOrderId(paymentOrderResponse.getGatewayOrderId());
        orderRepository.save(savedOrder);

        return mapToOrderResponse(savedOrder, paymentOrderResponse);
    }

    public OrderResponse getOrderById(UUID orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order with ID " + orderId + " not found."));
        return mapToOrderResponse(order, null);
    }

    public List<OrderResponse> getOrdersByCustomerId(UUID customerId) {
        List<Order> orders = orderRepository.findByCustomerId(customerId);
        return orders.stream()
                .map(order -> mapToOrderResponse(order, null))
                .collect(Collectors.toList());
    }

    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(order -> mapToOrderResponse(order, null))
                .collect(Collectors.toList());
    }

    @Transactional
    public OrderResponse updateOrderStatus(UUID orderId, OrderStatus newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order with ID " + orderId + " not found."));
        order.setStatus(newStatus);
        Order updatedOrder = orderRepository.save(order);
        return mapToOrderResponse(updatedOrder, null);
    }

    @EventListener
    @Transactional
    public void handlePaymentCapturedEvent(PaymentCapturedEvent event) {
        String referenceId = event.getReferenceId();
        if (referenceId != null && referenceId.startsWith("order_")) {
            try {
                UUID orderId = UUID.fromString(referenceId.substring("order_".length()));
                orderRepository.findById(orderId).ifPresentOrElse(
                        order -> {
                            if (order.getStatus() == OrderStatus.PENDING_PAYMENT) {
                                order.setStatus(OrderStatus.RECEIVED);
                                orderRepository.save(order);
                                log.info("Order {} status updated to RECEIVED after payment capture.", orderId);
                            } else {
                                log.warn("Order {} payment captured, but status is not PENDING_PAYMENT (current status: {}). No update performed.", orderId, order.getStatus());
                            }
                        },
                        () -> log.warn("Order with ID {} not found for payment captured event. Reference ID: {}", orderId, referenceId)
                );
            } catch (IllegalArgumentException e) {
                log.error("Invalid order ID format in payment captured event reference ID: {}", referenceId, e);
            }
        } else {
            log.warn("PaymentCapturedEvent received with invalid or missing referenceId: {}", referenceId);
        }
    }

    private OrderResponse mapToOrderResponse(Order order, PaymentOrderResponse paymentOrderResponse) {
        List<OrderItemResponse> itemResponses = order.getItems().stream()
                .map(this::mapToOrderItemResponse)
                .collect(Collectors.toList());

        return OrderResponse.builder()
                .id(Long.valueOf(order.getId().toString().hashCode())) // Placeholder for Long ID, assuming UUID is converted or mapped differently in a real scenario
                .customerId(Long.valueOf(order.getCustomerId().toString().hashCode())) // Placeholder
                .customerName(order.getCustomerName())
                .customerPhone(order.getCustomerPhone())
                .deliveryAddress(order.getDeliveryAddress())
                .notes(order.getNotes())
                .totalAmount(order.getTotalAmount())
                .status(order.getStatus())
                .orderDate(order.getOrderDate())
                .gatewayOrderId(order.getGatewayOrderId())
                .paymentOrderResponse(paymentOrderResponse)
                .orderItems(itemResponses)
                .build();
    }

    private OrderItemResponse mapToOrderItemResponse(OrderItem orderItem) {
        return OrderItemResponse.builder()
                .menuItemId(Long.valueOf(orderItem.getMenuItemId().toString().hashCode())) // Placeholder
                .menuItemName(orderItem.getMenuItemName())
                .quantity(orderItem.getQuantity())
                .unitPrice(orderItem.getUnitPrice())
                .subTotal(orderItem.getSubTotal())
                .build();
    }
}