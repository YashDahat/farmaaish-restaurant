package com.farmaaishrestaurant.model;

public enum OrderStatus {
    PENDING_PAYMENT,
    PENDING_PAYMENT_VERIFICATION,
    RECEIVED,
    PREPARING,
    READY_FOR_DELIVERY,
    DELIVERED,
    CANCELLED
}