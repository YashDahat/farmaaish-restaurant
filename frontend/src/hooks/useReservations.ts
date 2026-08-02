import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createReservation as createReservationService } from '@/services/reservationService';
import type { ReservationRequest } from '@/types/reservation';

export const useReservations = () => {
  const queryClient = useQueryClient();

  const {
    mutate: createReservation,
    isPending,
    isError,
    isSuccess,
    error,
    data,
  } = useMutation({
    mutationFn: (request: ReservationRequest) => createReservationService(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });

  return {
    createReservation,
    isPending,
    isError,
    isSuccess,
    error,
    data,
  };
};