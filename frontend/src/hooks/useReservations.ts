import { useMutation } from '@tanstack/react-query';
import { createReservation } from '@/services/reservationService';
import type { CreateReservationRequest, ReservationResponse } from '@/types/reservation';

export const useCreateReservation = () => {
  return useMutation<ReservationResponse, Error, CreateReservationRequest>({
    mutationFn: createReservation,
  });
};