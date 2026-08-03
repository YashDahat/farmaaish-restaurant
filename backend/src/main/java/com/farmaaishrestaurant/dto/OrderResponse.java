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
import com.farmaaishrestaurant.dto.PaymentOrderResponse;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private Long id;
    private Long customerId;
    private String customerName;
    private String customerPhone;
    private String deliveryAddress;
    private String notes;
    private java.math.BigDecimal totalAmount;
    private OrderStatus status;
    private LocalDateTime orderDate;
    private String gatewayOrderId;
    private PaymentOrderResponse paymentOrderResponse;
    private List<OrderItemResponse> orderItems;
}
