// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { CateringInquiryDto, InquiryStatus } from '@/types/inquiry';

export const submitCateringInquiry = async (request: CateringInquiryDto): Promise<CateringInquiryDto> => {
  const response = await apiClient.post<CateringInquiryDto>('/api/public/catering-inquiries', request);
  return response.data;
};

export const getAllCateringInquiries = async (): Promise<CateringInquiryDto[]> => {
  const response = await apiClient.get<CateringInquiryDto[]>('/api/admin/catering-inquiries');
  return response.data;
};

export const getCateringInquiryById = async (id: string): Promise<CateringInquiryDto> => {
  const response = await apiClient.get<CateringInquiryDto>(`/api/admin/catering-inquiries/${id}`);
  return response.data;
};

export const getCateringInquiriesByStatus = async (status: InquiryStatus): Promise<CateringInquiryDto[]> => {
  const response = await apiClient.get<CateringInquiryDto[]>(`/api/admin/catering-inquiries/status/${status}`);
  return response.data;
};

export const updateCateringInquiryStatus = async (id: string): Promise<CateringInquiryDto> => {
  const response = await apiClient.put<CateringInquiryDto>(`/api/admin/catering-inquiries/${id}/status`);
  return response.data;
};

