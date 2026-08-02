import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createOrder,
  getCustomerOrders,
  getOrderById,
  getAllOrders,
  adminGetOrderById,
  updateOrderStatus,
} from '@/services/orderService';
import type { CreateOrderRequest, Order } from '@/types/order';

export const useOrders = () => {
  const queryClient = useQueryClient();

  const {
    data: customerOrders,
    isLoading: isLoadingCustomerOrders,
    isError: isErrorCustomerOrders,
    error: customerOrdersError,
  } = useQuery<Order[]>({
    queryKey: ['customerOrders'],
    queryFn: getCustomerOrders,
  });

  const {
    data: allOrders,
    isLoading: isLoadingAllOrders,
    isError: isErrorAllOrders,
    error: allOrdersError,
  } = useQuery<Order[]>({
    queryKey: ['allOrders'],
    queryFn: getAllOrders,
  });

  const createOrderMutation = useMutation<Order, Error, CreateOrderRequest>({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customerOrders'] });
      queryClient.invalidateQueries({ queryKey: ['allOrders'] });
    },
  });

  const getOrderByIdQuery = (orderId: string) =>
    useQuery<Order, Error>({
      queryKey: ['order', orderId],
      queryFn: () => getOrderById(orderId),
      enabled: !!orderId,
    });

  const adminGetOrderByIdQuery = (orderId: string) =>
    useQuery<Order, Error>({
      queryKey: ['adminOrder', orderId],
      queryFn: () => adminGetOrderById(orderId),
      enabled: !!orderId,
    });

  const updateOrderStatusMutation = useMutation<Order, Error, string>({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allOrders'] });
      queryClient.invalidateQueries({ queryKey: ['adminOrder'] });
    },
  });

  return {
    customerOrders,
    isLoadingCustomerOrders,
    isErrorCustomerOrders,
    customerOrdersError,
    allOrders,
    isLoadingAllOrders,
    isErrorAllOrders,
    allOrdersError,
    createOrder: createOrderMutation.mutate,
    isCreatingOrder: createOrderMutation.isPending,
    createOrderError: createOrderMutation.error,
    createdOrder: createOrderMutation.data,
    getOrderByIdQuery,
    adminGetOrderByIdQuery,
    updateOrderStatus: updateOrderStatusMutation.mutate,
    isUpdatingOrderStatus: updateOrderStatusMutation.isPending,
    updateOrderStatusError: updateOrderStatusMutation.error,
  };
};