// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { CreateEventInquiryRequest, EventInquiryResponse } from '@/types/inquiry';

export const createInquiry = async (request: CreateEventInquiryRequest): Promise<EventInquiryResponse> => {
  const response = await apiClient.post<EventInquiryResponse>('/api/public/inquiries', request);
  return response.data;
};

export const getAllInquiries = async (): Promise<EventInquiryResponse[]> => {
  const response = await apiClient.get<EventInquiryResponse[]>('/api/admin/inquiries');
  return response.data;
};

export const getInquiryById = async (inquiryId: string): Promise<EventInquiryResponse> => {
  const response = await apiClient.get<EventInquiryResponse>(`/api/admin/inquiries/${inquiryId}`);
  return response.data;
};

export const updateInquiryStatus = async (inquiryId: string): Promise<EventInquiryResponse> => {
  const response = await apiClient.put<EventInquiryResponse>(`/api/admin/inquiries/${inquiryId}/status`);
  return response.data;
};

