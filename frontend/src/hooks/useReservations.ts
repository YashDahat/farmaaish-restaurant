import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { createReservation } from '@/services/reservationService';
import type { CreateReservationRequest, ReservationDto } from '@/types/reservation';
import { ROUTES } from '@/routes';

export const useCreateReservation = (): {
  mutate: (request: CreateReservationRequest) => void;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  data: ReservationDto | undefined;
  error: Error | null;
} => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, isError, isSuccess, data, error } = useMutation<
    ReservationDto,
    Error,
    CreateReservationRequest
  >({
    mutationFn: createReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Reservation created successfully!');
      navigate(ROUTES.HOME); // Navigate to home page on success
    },
    onError: (err) => {
      toast.error(`Failed to create reservation: ${err.message}`);
    },
  });

  return { mutate, isPending, isError, isSuccess, data, error };
};