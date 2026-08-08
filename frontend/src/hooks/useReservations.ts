import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createReservation, deleteReservation, getAllReservations, getReservationById, updateReservationStatus } from '@/services/reservationService';
import type { CreateReservationRequest, ReservationResponse, UpdateReservationStatusRequest } from '@/types/reservation';

export const useCreateReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: CreateReservationRequest): Promise<void> => createReservation(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Reservation created successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to create reservation: ${error.message}`);
    },
  });
};

export const useGetAllReservations = () => {
  return useQuery<ReservationResponse[], Error>({
    queryKey: ['reservations'],
    queryFn: getAllReservations,
  });
};

export const useGetReservationById = (id: string) => {
  return useQuery<ReservationResponse, Error>({
    queryKey: ['reservation', id],
    queryFn: () => getReservationById(id),
    enabled: !!id,
  });
};

export const useUpdateReservationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, request }: { id: string; request: UpdateReservationStatusRequest }): Promise<ReservationResponse> =>
      updateReservationStatus(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Reservation status updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to update reservation status: ${error.message}`);
    },
  });
};

export const useDeleteReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string): Promise<void> => deleteReservation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Reservation deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete reservation: ${error.message}`);
    },
  });
};