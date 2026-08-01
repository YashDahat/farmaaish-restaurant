// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { CreateReservationRequest, ReservationResponse, ReservationStatus } from '@/types/reservation';

export const createReservation = async (request: CreateReservationRequest): Promise<ReservationResponse> => {
  const response = await apiClient.post<ReservationResponse>('/api/public/reservations', request);
  return response.data;
};

export const getAllReservations = async (): Promise<ReservationResponse[]> => {
  const response = await apiClient.get<ReservationResponse[]>('/api/admin/reservations');
  return response.data;
};

export const getReservationById = async (id: string): Promise<ReservationResponse> => {
  const response = await apiClient.get<ReservationResponse>(`/api/admin/reservations/${id}`);
  return response.data;
};

export const getReservationsByStatus = async (status: ReservationStatus): Promise<ReservationResponse[]> => {
  const response = await apiClient.get<ReservationResponse[]>(`/api/admin/reservations/status/${status}`);
  return response.data;
};

export const updateReservationStatus = async (id: string): Promise<ReservationResponse> => {
  const response = await apiClient.put<ReservationResponse>(`/api/admin/reservations/${id}/status`);
  return response.data;
};

