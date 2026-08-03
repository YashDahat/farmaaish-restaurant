// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { CateringInquiryDto } from '@/types/inquiry';

export const submitInquiry = async (request: CateringInquiryDto): Promise<CateringInquiryDto> => {
  const response = await apiClient.post<CateringInquiryDto>('/api/v1/inquiries/catering', request);
  return response.data;
};

export const getAllInquiries = async (): Promise<CateringInquiryDto[]> => {
  const response = await apiClient.get<CateringInquiryDto[]>('/api/v1/admin/inquiries/catering');
  return response.data;
};

export const getInquiryById = async (id: number): Promise<CateringInquiryDto> => {
  const response = await apiClient.get<CateringInquiryDto>(`/api/v1/admin/inquiries/catering/${id}`);
  return response.data;
};

export const deleteInquiry = async (id: number): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/admin/inquiries/catering/${id}`);
};

