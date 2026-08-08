// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface OrderResponse {
  id: string;
  customerId: string;
  orderDate: string;
  totalAmount: number;
  status: OrderStatus;
  deliveryAddress: string;
  contactPhone: string;
  orderItems: OrderItemResponse[];
}

export interface UpdateOrderStatusRequest {
  newStatus: OrderStatus;
}

export interface CreateOrderRequest {
  orderItems: OrderItemRequest[];
  deliveryAddress: string;
  contactPhone: string;
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

export interface OrderItemResponse {
  id: string;
  menuItemId: string;
  menuItemName: string;
  quantity: number;
  price: number;
}

export interface OrderItemRequest {
  menuItemId: string;
  quantity: number;
}

