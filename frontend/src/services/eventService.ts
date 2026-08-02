// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { EventDto } from '@/types/event';

export const getAllActiveEvents = async (): Promise<EventDto[]> => {
  const response = await apiClient.get<EventDto[]>('/api/events/active');
  return response.data;
};

export const getEventsByType = async (eventType: string): Promise<EventDto[]> => {
  const response = await apiClient.get<EventDto[]>(`/api/events/type/${eventType}`);
  return response.data;
};

export const getEventById = async (id: string): Promise<EventDto> => {
  const response = await apiClient.get<EventDto>(`/api/events/${id}`);
  return response.data;
};

export const createEvent = async (request: EventDto): Promise<EventDto> => {
  const response = await apiClient.post<EventDto>('/api/admin/events', request);
  return response.data;
};

export const getAllEvents = async (): Promise<EventDto[]> => {
  const response = await apiClient.get<EventDto[]>('/api/admin/events');
  return response.data;
};

export const adminGetEventById = async (id: string): Promise<EventDto> => {
  const response = await apiClient.get<EventDto>(`/api/admin/events/${id}`);
  return response.data;
};

export const updateEvent = async (id: string, request: EventDto): Promise<EventDto> => {
  const response = await apiClient.put<EventDto>(`/api/admin/events/${id}`, request);
  return response.data;
};

