// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { CreateInquiryRequest, InquiryResponse, UpdateInquiryStatusRequest } from '@/types/inquiry';

export const submitInquiry = async (request: CreateInquiryRequest): Promise<InquiryResponse> => {
  const response = await apiClient.post<InquiryResponse>('/api/v1/inquiries', request);
  return response.data;
};

export const getAllInquiries = async (): Promise<InquiryResponse[]> => {
  const response = await apiClient.get<InquiryResponse[]>('/api/v1/admin/inquiries');
  return response.data;
};

export const getInquiryById = async (id: string): Promise<InquiryResponse> => {
  const response = await apiClient.get<InquiryResponse>(`/api/v1/admin/inquiries/${id}`);
  return response.data;
};

export const updateInquiryStatus = async (id: string, request: UpdateInquiryStatusRequest): Promise<InquiryResponse> => {
  const response = await apiClient.put<InquiryResponse>(`/api/v1/admin/inquiries/${id}/status`, request);
  return response.data;
};

