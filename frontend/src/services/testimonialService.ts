// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { TestimonialDto } from '@/types/testimonial';

export const getAllVisibleTestimonials = async (): Promise<TestimonialDto[]> => {
  const response = await apiClient.get<TestimonialDto[]>('/api/testimonials');
  return response.data;
};

export const getTestimonialById = async (id: string): Promise<TestimonialDto> => {
  const response = await apiClient.get<TestimonialDto>(`/api/testimonials/${id}`);
  return response.data;
};

export const getAllTestimonials = async (): Promise<TestimonialDto[]> => {
  const response = await apiClient.get<TestimonialDto[]>('/api/admin/testimonials');
  return response.data;
};

export const adminGetTestimonialById = async (id: string): Promise<TestimonialDto> => {
  const response = await apiClient.get<TestimonialDto>(`/api/admin/testimonials/${id}`);
  return response.data;
};

export const createTestimonial = async (request: TestimonialDto): Promise<TestimonialDto> => {
  const response = await apiClient.post<TestimonialDto>('/api/admin/testimonials', request);
  return response.data;
};

export const updateTestimonial = async (id: string, request: TestimonialDto): Promise<TestimonialDto> => {
  const response = await apiClient.put<TestimonialDto>(`/api/admin/testimonials/${id}`, request);
  return response.data;
};

