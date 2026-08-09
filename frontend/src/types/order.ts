// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface OrderDto {
  id: string;
  userId: number;
  orderItems: OrderItemDto[];
  totalAmount: number;
  status: OrderStatus;
  gatewayOrderId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  userId: number;
  items: OrderItemRequest[];
}

export interface OrderItemDto {
  menuItemId: string;
  menuItemName: string;
  quantity: number;
  subTotal: number;
}

export type OrderStatus = 'PENDING_PAYMENT' | 'RECEIVED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

export interface OrderItemRequest {
  menuItemId: string;
  quantity: number;
}

