package com.farmaaishrestaurant.dto;

import jakarta.validation.constraints.*;
import java.util.List;
import java.util.UUID;
import java.time.LocalDateTime;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.farmaaishrestaurant.dto.OrderItemResponse;
import com.farmaaishrestaurant.model.OrderStatus;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private UUID id;
    private List<OrderItemResponse> orderItems;
    private java.math.BigDecimal totalAmount;
    private OrderStatus status;
    private String customerName;
    private String customerPhone;
    private String deliveryAddress;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
