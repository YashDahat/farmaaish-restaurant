// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { CreateOrderRequest, OrderResponse, PaymentOrderResponse } from '@/types/order';
import type { CreatePaymentRequest } from '@/types/payment';

export const createOrder = async (request: CreatePaymentRequest): Promise<PaymentOrderResponse> => {
  const response = await apiClient.post<PaymentOrderResponse>('/api/v1/payments/create-order', request);
  return response.data;
};

export const createOrderV2 = async (request: CreateOrderRequest): Promise<OrderResponse> => {
  const response = await apiClient.post<OrderResponse>('/api/orders', request);
  return response.data;
};

export const getOrderById = async (orderId: string): Promise<OrderResponse> => {
  const response = await apiClient.get<OrderResponse>(`/api/orders/${orderId}`);
  return response.data;
};

export const getAllOrders = async (): Promise<OrderResponse[]> => {
  const response = await apiClient.get<OrderResponse[]>('/api/admin/orders');
  return response.data;
};

export const adminGetOrderById = async (orderId: string): Promise<OrderResponse> => {
  const response = await apiClient.get<OrderResponse>(`/api/admin/orders/${orderId}`);
  return response.data;
};

export const updateOrderStatus = async (orderId: string): Promise<OrderResponse> => {
  const response = await apiClient.put<OrderResponse>(`/api/admin/orders/${orderId}/status`);
  return response.data;
};

