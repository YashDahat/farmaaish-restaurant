// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { InquiryDto } from '@/types/inquiry';

export const createInquiry = async (request: InquiryDto): Promise<InquiryDto> => {
  const response = await apiClient.post<InquiryDto>('/api/v1/inquiries', request);
  return response.data;
};

export const getAllInquiries = async (): Promise<InquiryDto[]> => {
  const response = await apiClient.get<InquiryDto[]>('/api/v1/admin/inquiries');
  return response.data;
};

export const getInquiryById = async (id: string): Promise<InquiryDto> => {
  const response = await apiClient.get<InquiryDto>(`/api/v1/admin/inquiries/${id}`);
  return response.data;
};

export const updateInquiryStatus = async (id: string): Promise<InquiryDto> => {
  const response = await apiClient.put<InquiryDto>(`/api/v1/admin/inquiries/${id}/status`);
  return response.data;
};

export const deleteInquiry = async (id: string): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/admin/inquiries/${id}`);
};

