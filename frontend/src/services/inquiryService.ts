// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { CateringInquiryDto, CreateInquiryRequest } from '@/types/inquiry';

export const createInquiry = async (request: CreateInquiryRequest): Promise<CateringInquiryDto> => {
  const response = await apiClient.post<CateringInquiryDto>('/api/v1/catering-inquiries', request);
  return response.data;
};

export const getAllInquiries = async (): Promise<CateringInquiryDto[]> => {
  const response = await apiClient.get<CateringInquiryDto[]>('/api/v1/admin/catering-inquiries');
  return response.data;
};

export const getInquiryById = async (id: string): Promise<CateringInquiryDto> => {
  const response = await apiClient.get<CateringInquiryDto>(`/api/v1/admin/catering-inquiries/${id}`);
  return response.data;
};

export const updateInquiryStatus = async (id: string): Promise<CateringInquiryDto> => {
  const response = await apiClient.put<CateringInquiryDto>(`/api/v1/admin/catering-inquiries/${id}/status`);
  return response.data;
};

