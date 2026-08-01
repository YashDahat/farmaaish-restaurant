import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createOrder, getCustomerOrderById, getAllOrders, getOrderById, updateOrderStatus } from '@/services/orderService';
import type { CreateOrderRequest, OrderResponse } from '@/types/order';

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: CreateOrderRequest) => createOrder(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order placed successfully!');
    },
    onError: (error) => {
      toast.error('Failed to place order.', {
        description: error.message,
      });
    },
  });
};

export const useCustomerOrderById = (orderId: string) => {
  return useQuery<OrderResponse, Error>({
    queryKey: ['customerOrder', orderId],
    queryFn: () => getCustomerOrderById(orderId),
    enabled: !!orderId,
  });
};

export const useAllOrders = () => {
  return useQuery<OrderResponse[], Error>({
    queryKey: ['adminOrders'],
    queryFn: getAllOrders,
  });
};

export const useOrderById = (orderId: string) => {
  return useQuery<OrderResponse, Error>({
    queryKey: ['adminOrder', orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderId: string) => updateOrderStatus(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminOrders'] });
      queryClient.invalidateQueries({ queryKey: ['adminOrder'] });
      toast.success('Order status updated successfully!');
    },
    onError: (error) => {
      toast.error('Failed to update order status.', {
        description: error.message,
      });
    },
  });
};