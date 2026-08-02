// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { CustomerDto } from '@/types/customer';

export const getCustomerProfile = async (): Promise<CustomerDto> => {
  const response = await apiClient.get<CustomerDto>('/api/v1/customers/profile');
  return response.data;
};

export const updateCustomerProfile = async (request: CustomerDto): Promise<CustomerDto> => {
  const response = await apiClient.put<CustomerDto>('/api/v1/customers/profile', request);
  return response.data;
};

