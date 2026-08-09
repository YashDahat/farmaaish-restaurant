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

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private UUID id;
    private Integer userId;
    private List<OrderItemDto> orderItems;
    private java.math.BigDecimal totalAmount;
    private OrderStatus status;
    private String gatewayOrderId;
    private java.time.Instant createdAt;
    private java.time.Instant updatedAt;
}
