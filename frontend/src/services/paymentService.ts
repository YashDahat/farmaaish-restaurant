// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { VerifyPaymentRequest } from '@/types/verify';
import type { PaymentVerificationResponse } from '@/types/payment';

export const verify = async (request: VerifyPaymentRequest): Promise<PaymentVerificationResponse> => {
  const response = await apiClient.post<PaymentVerificationResponse>('/api/v1/payments/verify', request);
  return response.data;
};

export const webhook = async (request: unknown): Promise<unknown> => {
  const response = await apiClient.post<unknown>('/api/v1/payments/webhook', request);
  return response.data;
};

