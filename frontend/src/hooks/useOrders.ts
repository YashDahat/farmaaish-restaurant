import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByCustomerId,
  updateOrderStatus,
} from '@/services/orderService';
import type { CreateOrderRequest, OrderResponse, OrderStatus } from '@/types/order';

export function useCreateOrder(): {
  mutate: (request: CreateOrderRequest) => void;
  isPending: boolean;
  isError: boolean;
  data: OrderResponse | undefined;
  error: Error | null;
} {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, data, error } = useMutation<
    OrderResponse,
    Error,
    CreateOrderRequest
  >({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['allOrders'] });
    },
  });
  return { mutate, isPending, isError, data, error };
}

export function useOrder(orderId: string): {
  data: OrderResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} {
  const { data, isLoading, isError, error } = useQuery<OrderResponse, Error>({
    queryKey: ['order', orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  });
  return { data, isLoading, isError, error };
}

export function useCustomerOrders(customerId: string): {
  data: OrderResponse[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} {
  const { data, isLoading, isError, error } = useQuery<OrderResponse[], Error>({
    queryKey: ['customerOrders', customerId],
    queryFn: () => getOrdersByCustomerId(customerId),
    enabled: !!customerId,
  });
  return { data, isLoading, isError, error };
}

export function useAllOrders(): {
  data: OrderResponse[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
} {
  const { data, isLoading, isError, error } = useQuery<OrderResponse[], Error>({
    queryKey: ['allOrders'],
    queryFn: getAllOrders,
  });
  return { data, isLoading, isError, error };
}

export function useUpdateOrderStatus(): {
  mutate: (orderId: string) => void;
  isPending: boolean;
  isError: boolean;
  data: OrderResponse | undefined;
  error: Error | null;
} {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, data, error } = useMutation<
    OrderResponse,
    Error,
    string
  >({
    mutationFn: (orderId: string) => updateOrderStatus(orderId),
    onSuccess: (_, orderId) => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['allOrders'] });
      queryClient.invalidateQueries({ queryKey: ['order', orderId] });
    },
  });
  return { mutate, isPending, isError, data, error };
}