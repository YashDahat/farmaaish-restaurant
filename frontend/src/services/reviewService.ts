// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { ReviewDto } from '@/types/review';

export const getFeaturedReviews = async (): Promise<ReviewDto[]> => {
  const response = await apiClient.get<ReviewDto[]>('/api/v1/reviews/featured');
  return response.data;
};

export const getAllReviews = async (): Promise<ReviewDto[]> => {
  const response = await apiClient.get<ReviewDto[]>('/api/admin/reviews');
  return response.data;
};

export const getReviewById = async (id: string): Promise<ReviewDto> => {
  const response = await apiClient.get<ReviewDto>(`/api/admin/reviews/${id}`);
  return response.data;
};

export const createReview = async (request: ReviewDto): Promise<ReviewDto> => {
  const response = await apiClient.post<ReviewDto>('/api/admin/reviews', request);
  return response.data;
};

export const updateReview = async (id: string, request: ReviewDto): Promise<ReviewDto> => {
  const response = await apiClient.put<ReviewDto>(`/api/admin/reviews/${id}`, request);
  return response.data;
};

