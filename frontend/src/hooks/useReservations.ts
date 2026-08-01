import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { createReservation } from '@/services/reservationService';
import type { CreateReservationRequest, ReservationResponse } from '@/types/reservation';

export const useCreateReservation = (
  options?: UseMutationOptions<ReservationResponse, Error, CreateReservationRequest>
): UseMutationResult<ReservationResponse, Error, CreateReservationRequest> => {
  return useMutation<ReservationResponse, Error, CreateReservationRequest>({
    mutationFn: createReservation,
    ...options,
  });
};