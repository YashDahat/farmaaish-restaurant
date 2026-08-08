// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { CreateReservationRequest, ReservationResponse, UpdateReservationStatusRequest } from '@/types/reservation';

export const createReservation = async (request: CreateReservationRequest): Promise<void> => {
  await apiClient.post<void>('/api/v1/reservations', request);
};

export const getAllReservations = async (): Promise<ReservationResponse[]> => {
  const response = await apiClient.get<ReservationResponse[]>('/api/v1/admin/reservations');
  return response.data;
};

export const getReservationById = async (id: string): Promise<ReservationResponse> => {
  const response = await apiClient.get<ReservationResponse>(`/api/v1/admin/reservations/${id}`);
  return response.data;
};

export const updateReservationStatus = async (id: string, request: UpdateReservationStatusRequest): Promise<ReservationResponse> => {
  const response = await apiClient.put<ReservationResponse>(`/api/v1/admin/reservations/${id}/status`, request);
  return response.data;
};

export const deleteReservation = async (id: string): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/admin/reservations/${id}`);
};

