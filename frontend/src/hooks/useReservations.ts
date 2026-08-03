import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createReservation,
  deleteReservation,
  getAllReservations,
  getReservationById,
  getReservationsByDateRange,
  updateReservationStatus,
} from '@/services/reservationService';
import type { CreateReservationRequest, ReservationDto } from '@/types/reservation';

export const useCreateReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: CreateReservationRequest): Promise<ReservationDto> => createReservation(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });
};

export const useAllReservations = () => {
  return useQuery<ReservationDto[], Error>({
    queryKey: ['reservations'],
    queryFn: getAllReservations,
  });
};

export const useReservationById = (id: number) => {
  return useQuery<ReservationDto, Error>({
    queryKey: ['reservation', id],
    queryFn: () => getReservationById(id),
    enabled: !!id,
  });
};

export const useReservationsByDateRange = () => {
  return useQuery<ReservationDto[], Error>({
    queryKey: ['reservationsByDateRange'],
    queryFn: getReservationsByDateRange,
  });
};

export const useUpdateReservationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number): Promise<ReservationDto> => updateReservationStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      queryClient.invalidateQueries({ queryKey: ['reservationsByDateRange'] });
    },
  });
};

export const useDeleteReservation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number): Promise<void> => deleteReservation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      queryClient.invalidateQueries({ queryKey: ['reservationsByDateRange'] });
    },
  });
};