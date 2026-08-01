import { useMutation, useQuery } from '@tanstack/react-query';
import { createOrderV2, getOrderById, getAllOrders } from '@/services/orderService';
import type { CreateOrderRequest, OrderResponse } from '@/types/order';

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (request: CreateOrderRequest) => createOrderV2(request),
  });
};

export const useOrderById = (orderId: string) => {
  return useQuery<OrderResponse, Error>({
    queryKey: ['order', orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  });
};

export const useAllOrders = () => {
  return useQuery<OrderResponse[], Error>({
    queryKey: ['orders'],
    queryFn: getAllOrders,
  });
};