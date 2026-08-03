// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { CreateReservationRequest, ReservationDto } from '@/types/reservation';

export const createReservation = async (request: CreateReservationRequest): Promise<ReservationDto> => {
  const response = await apiClient.post<ReservationDto>('/api/v1/reservations', request);
  return response.data;
};

export const getAllReservations = async (): Promise<ReservationDto[]> => {
  const response = await apiClient.get<ReservationDto[]>('/api/v1/admin/reservations');
  return response.data;
};

export const getReservationsByDateRange = async (): Promise<ReservationDto[]> => {
  const response = await apiClient.get<ReservationDto[]>('/api/v1/admin/reservations/by-date-range');
  return response.data;
};

export const getReservationById = async (id: number): Promise<ReservationDto> => {
  const response = await apiClient.get<ReservationDto>(`/api/v1/admin/reservations/${id}`);
  return response.data;
};

export const updateReservationStatus = async (id: number): Promise<ReservationDto> => {
  const response = await apiClient.put<ReservationDto>(`/api/v1/admin/reservations/${id}/status`);
  return response.data;
};

export const deleteReservation = async (id: number): Promise<void> => {
  await apiClient.delete<void>(`/api/v1/admin/reservations/${id}`);
};

