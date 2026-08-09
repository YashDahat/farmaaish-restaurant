import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder } from '@/services/orderService';
import type { CreateOrderRequest, OrderDto } from '@/types/order';
import { toast } from 'sonner';

export function useOrders(): {
  createOrder: (request: CreateOrderRequest) => void;
  isCreatingOrder: boolean;
  createOrderError: Error | null;
  createdOrder: OrderDto | undefined;
} {
  const queryClient = useQueryClient();

  const {
    mutate: createOrderMutation,
    isPending: isCreatingOrder,
    error: createOrderError,
    data: createdOrder,
  } = useMutation<OrderDto, Error, CreateOrderRequest>({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order placed successfully!');
    },
    onError: (error) => {
      toast.error(`Failed to place order: ${error.message}`);
    },
  });

  return {
    createOrder: createOrderMutation,
    isCreatingOrder,
    createOrderError,
    createdOrder,
  };
}