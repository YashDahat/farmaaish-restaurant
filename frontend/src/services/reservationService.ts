// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { Reservation, ReservationRequest } from '@/types/reservation';

export const createReservation = async (request: ReservationRequest): Promise<Reservation> => {
  const response = await apiClient.post<Reservation>('/api/v1/reservations', request);
  return response.data;
};

export const getAllReservations = async (): Promise<Reservation[]> => {
  const response = await apiClient.get<Reservation[]>('/api/v1/admin/reservations');
  return response.data;
};

export const getReservationById = async (id: string): Promise<Reservation> => {
  const response = await apiClient.get<Reservation>(`/api/v1/admin/reservations/${id}`);
  return response.data;
};

export const updateReservation = async (id: string, request: Reservation): Promise<Reservation> => {
  const response = await apiClient.put<Reservation>(`/api/v1/admin/reservations/${id}`, request);
  return response.data;
};

export const deleteReservation = async (id: string): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/admin/reservations/${id}`);
};

