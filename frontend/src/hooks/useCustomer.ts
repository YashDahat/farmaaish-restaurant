import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCustomerProfile, updateCustomerProfile as apiUpdateCustomerProfile } from '@/services/customerService';
import { CustomerDto } from '@/types/customer';

export const useCustomer = () => {
  const queryClient = useQueryClient();

  const {
    data: customer,
    isLoading,
    isError,
    error,
    refetch: refetchCustomer,
  } = useQuery<CustomerDto, Error>({
    queryKey: ['customerProfile'],
    queryFn: getCustomerProfile,
  });

  const {
    mutate: updateCustomerProfile,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useMutation<CustomerDto, Error, CustomerDto>({
    mutationFn: apiUpdateCustomerProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customerProfile'] });
    },
  });

  return {
    customer,
    isLoading,
    isError,
    error,
    updateCustomerProfile,
    isUpdating,
    isUpdateError,
    updateError,
    refetchCustomer,
  };
};