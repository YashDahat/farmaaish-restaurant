// GENERATED from the backend API contract — do not edit by hand.
// One function per endpoint; paths and types are ground truth.

import apiClient from '@/api/client';
import type { SpecialOfferDto } from '@/types/offer';

export const getAllActiveSpecialOffers = async (): Promise<SpecialOfferDto[]> => {
  const response = await apiClient.get<SpecialOfferDto[]>('/api/v1/public/offers/active');
  return response.data;
};

export const createSpecialOffer = async (request: SpecialOfferDto): Promise<SpecialOfferDto> => {
  const response = await apiClient.post<SpecialOfferDto>('/api/admin/special-offers', request);
  return response.data;
};

export const getAllSpecialOffers = async (): Promise<SpecialOfferDto[]> => {
  const response = await apiClient.get<SpecialOfferDto[]>('/api/admin/special-offers');
  return response.data;
};

export const getSpecialOfferById = async (id: string): Promise<SpecialOfferDto> => {
  const response = await apiClient.get<SpecialOfferDto>(`/api/admin/special-offers/${id}`);
  return response.data;
};

export const updateSpecialOffer = async (id: string, request: SpecialOfferDto): Promise<SpecialOfferDto> => {
  const response = await apiClient.put<SpecialOfferDto>(`/api/admin/special-offers/${id}`, request);
  return response.data;
};

