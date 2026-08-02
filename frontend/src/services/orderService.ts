// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { CreateOrderRequest, Order } from '@/types/order';

export const createOrder = async (request: CreateOrderRequest): Promise<Order> => {
  const response = await apiClient.post<Order>('/api/orders', request);
  return response.data;
};

export const getOrderById = async (orderId: string): Promise<Order> => {
  const response = await apiClient.get<Order>(`/api/orders/${orderId}`);
  return response.data;
};

export const getOrdersByCustomerId = async (customerId: string): Promise<Order[]> => {
  const response = await apiClient.get<Order[]>(`/api/orders/customer/${customerId}`);
  return response.data;
};

export const getCustomerOrders = async (): Promise<Order[]> => {
  const response = await apiClient.get<Order[]>('/api/v1/customers/profile/orders');
  return response.data;
};

export const getAllOrders = async (): Promise<Order[]> => {
  const response = await apiClient.get<Order[]>('/api/admin/orders');
  return response.data;
};

export const adminGetOrderById = async (orderId: string): Promise<Order> => {
  const response = await apiClient.get<Order>(`/api/admin/orders/${orderId}`);
  return response.data;
};

export const updateOrderStatus = async (orderId: string): Promise<Order> => {
  const response = await apiClient.put<Order>(`/api/admin/orders/${orderId}/status`);
  return response.data;
};

