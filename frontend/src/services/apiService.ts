// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';

export const deleteReview = async (id: string): Promise<void> => {
  await apiClient.delete<void>(`/api/admin/reviews/${id}`);
};

export const syncReviews = async (): Promise<unknown> => {
  const response = await apiClient.post<unknown>('/api/admin/reviews/sync');
  return response.data;
};

export const deleteMenuCategory = async (categoryId: string): Promise<void> => {
  await apiClient.delete<void>(`/api/admin/menu/categories/${categoryId}`);
};

export const deleteMenuItem = async (itemId: string): Promise<void> => {
  await apiClient.delete<void>(`/api/admin/menu/items/${itemId}`);
};

export const deleteSpecialOffer = async (id: string): Promise<void> => {
  await apiClient.delete<void>(`/api/admin/special-offers/${id}`);
};

