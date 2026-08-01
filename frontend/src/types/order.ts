// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface OrderResponse {
  id: string | null;
  orderItems: OrderItemResponse[] | null;
  totalAmount: number | null;
  status: OrderStatus | null;
  customerName: string | null;
  customerPhone: string | null;
  deliveryAddress: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface CreateOrderRequest {
  orderItems: OrderItemRequest[] | null;
  customerName: string | null;
  customerPhone: string | null;
  deliveryAddress: string | null;
}

export interface OrderItemResponse {
  id: string | null;
  menuItemId: string | null;
  name: string | null;
  quantity: number | null;
  unitPrice: number | null;
}

export type OrderStatus = 'PENDING_PAYMENT' | 'RECEIVED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

export interface OrderItemRequest {
  menuItemId: string | null;
  quantity: number | null;
}

