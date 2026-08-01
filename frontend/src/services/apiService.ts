// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';

export const deleteCateringInquiry = async (id: string): Promise<void> => {
  await apiClient.delete<void>(`/api/admin/catering-inquiries/${id}`);
};

export const deleteReservation = async (id: string): Promise<void> => {
  await apiClient.delete<void>(`/api/admin/reservations/${id}`);
};

export const deleteTestimonial = async (id: string): Promise<void> => {
  await apiClient.delete<void>(`/api/admin/testimonials/${id}`);
};

