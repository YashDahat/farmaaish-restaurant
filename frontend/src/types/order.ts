// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface Order {
  id: string;
  customerId: string | null;
  orderDate: string | null;
  totalAmount: number | null;
  status: OrderStatus | null;
  deliveryAddress: string | null;
  contactPhone: string | null;
  paymentOrderId: string | null;
  paymentLink: string | null;
}

export interface CreateOrderRequest {
  customerId: string | null;
  deliveryAddress: string | null;
  contactPhone: string | null;
  orderItems: OrderItemRequest[] | null;
}

export type OrderStatus = 'PENDING_PAYMENT' | 'RECEIVED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

export interface OrderItemRequest {
  menuItemId: string | null;
  quantity: number | null;
}

