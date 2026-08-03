// GENERATED from the backend API contract — do not edit by hand.
// Source of truth: backend controllers/DTOs (see docs/API_INVENTORY.json).

export interface OrderResponse {
  id: number;
  customerId: number;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  notes: string;
  totalAmount: number;
  status: OrderStatus;
  orderDate: string;
  gatewayOrderId: string;
  paymentOrderResponse: PaymentOrderResponse;
  orderItems: OrderItemResponse[];
}

export interface CreateOrderRequest {
  customerId: number;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  notes: string;
  orderItems: OrderItemRequest[];
}

export type OrderStatus = 'PENDING_PAYMENT' | 'RECEIVED' | 'IN_PROGRESS' | 'READY_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';

export interface PaymentOrderResponse {
  gatewayOrderId: string;
  gatewayKeyId: string;
  amount: number;
  currency: string;
  paymentRecordId: number;
}

export interface OrderItemResponse {
  menuItemId: number;
  menuItemName: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
}

export interface OrderItemRequest {
  menuItemId: number;
  quantity: number;
}

