package com.farmaaishrestaurant.dto;

import jakarta.validation.constraints.*;
import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.farmaaishrestaurant.model.OrderStatus;
import com.farmaaishrestaurant.model.OrderItem;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private UUID id;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String deliveryAddress;
    private java.math.BigDecimal totalAmount;
    private OrderStatus orderStatus;
    private String paymentTransactionId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<OrderItem> orderItems;
}
