// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { CreateOrderRequest, OrderDto } from '@/types/order';

export const createOrder = async (request: CreateOrderRequest): Promise<OrderDto> => {
  const response = await apiClient.post<OrderDto>('/api/v1/orders', request);
  return response.data;
};

export const getOrderById = async (orderId: string): Promise<OrderDto> => {
  const response = await apiClient.get<OrderDto>(`/api/v1/orders/${orderId}`);
  return response.data;
};

export const getOrdersByUserId = async (userId: string): Promise<OrderDto[]> => {
  const response = await apiClient.get<OrderDto[]>(`/api/v1/orders/user/${userId}`);
  return response.data;
};

export const getAllOrders = async (): Promise<OrderDto[]> => {
  const response = await apiClient.get<OrderDto[]>('/api/v1/admin/orders');
  return response.data;
};

export const adminGetOrderById = async (orderId: string): Promise<OrderDto> => {
  const response = await apiClient.get<OrderDto>(`/api/v1/admin/orders/${orderId}`);
  return response.data;
};

export const updateOrderStatus = async (orderId: string): Promise<OrderDto> => {
  const response = await apiClient.put<OrderDto>(`/api/v1/admin/orders/${orderId}/status`);
  return response.data;
};

