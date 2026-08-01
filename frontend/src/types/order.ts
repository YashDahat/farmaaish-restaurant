// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface OrderResponse {
  id: string | null;
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  deliveryAddress: string | null;
  totalAmount: number | null;
  orderStatus: OrderStatus | null;
  paymentTransactionId: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  orderItems: OrderItem[] | null;
}

export interface PaymentOrderResponse {
  gatewayOrderId: string | null;
  gatewayKeyId: string | null;
  amount: number | null;
  currency: string | null;
  paymentRecordId: number | null;
}

export interface CreateOrderRequest {
  customerName: string | null;
  customerEmail: string | null;
  customerPhone: string | null;
  deliveryAddress: string | null;
  orderItems: OrderItemRequest[] | null;
}

export type OrderStatus = 'PENDING_PAYMENT' | 'PENDING_PAYMENT_VERIFICATION' | 'RECEIVED' | 'PREPARING' | 'READY_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

export interface OrderItem {
  id: string;
  order: Order | null;
  menuItemId: string | null;
  menuItemName: string | null;
  quantity: number | null;
  unitPrice: number | null;
}

export interface OrderItemRequest {
  menuItemId: string | null;
  quantity: number | null;
}

export interface Order {
  id: string;
  customerName: string | null;
  customerEmail: string | null;
  deliveryAddress: string | null;
  totalAmount: number | null;
  orderStatus: OrderStatus | null;
  createdAt: string | null;
  updatedAt: string | null;
}

