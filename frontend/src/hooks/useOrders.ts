import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createOrder, getMyOrders, getAllOrders, getOrderById, adminGetOrderById, updateOrderStatus } from '@/services/orderService';
import type { CreateOrderRequest, OrderResponse, UpdateOrderStatusRequest } from '@/types/order';

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: CreateOrderRequest): Promise<OrderResponse> => createOrder(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myOrders'] });
      queryClient.invalidateQueries({ queryKey: ['allOrders'] });
    },
  });
}

export function useMyOrders(): { orders: OrderResponse[] | undefined; isLoading: boolean; isError: boolean; error: Error | null } {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['myOrders'],
    queryFn: getMyOrders,
  });
  return { orders: data, isLoading, isError, error };
}

export function useAllOrders(): { orders: OrderResponse[] | undefined; isLoading: boolean; isError: boolean; error: Error | null } {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['allOrders'],
    queryFn: getAllOrders,
  });
  return { orders: data, isLoading, isError, error };
}

export function useOrderById(orderId: string): { order: OrderResponse | undefined; isLoading: boolean; isError: boolean; error: Error | null } {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  });
  return { order: data, isLoading, isError, error };
}

export function useAdminOrderById(orderId: string): { order: OrderResponse | undefined; isLoading: boolean; isError: boolean; error: Error | null } {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['adminOrder', orderId],
    queryFn: () => adminGetOrderById(orderId),
    enabled: !!orderId,
  });
  return { order: data, isLoading, isError, error };
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, request }: { orderId: string; request: UpdateOrderStatusRequest }): Promise<OrderResponse> =>
      updateOrderStatus(orderId, request),
    onSuccess: (_, { orderId }) => {
      queryClient.invalidateQueries({ queryKey: ['order', orderId] });
      queryClient.invalidateQueries({ queryKey: ['adminOrder', orderId] });
      queryClient.invalidateQueries({ queryKey: ['allOrders'] });
      queryClient.invalidateQueries({ queryKey: ['myOrders'] });
    },
  });
}