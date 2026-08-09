import type { JSX } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  getAllReservations,
  updateReservationStatus,
  deleteReservation,
} from '@/services/reservationService';
import type { ReservationDto, ReservationStatus } from '@/types/reservation';
import { Skeleton } from '@/components/ui/skeleton';

export default function ReservationsTable(): React.JSX.Element {
  const queryClient = useQueryClient();
  const { data: reservations, isLoading, isError, error } = useQuery<ReservationDto[], Error>({
    queryKey: ['reservations'],
    queryFn: getAllReservations,
  });

  const updateStatusMutation = useMutation<ReservationDto, Error, { id: string; status: ReservationStatus }>({
    mutationFn: ({ id }) => updateReservationStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Reservation status updated successfully!');
    },
    onError: (err) => {
      toast.error(`Failed to update reservation status: ${err.message}`);
    },
  });

  const deleteReservationMutation = useMutation<void, Error, string>({
    mutationFn: deleteReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Reservation deleted successfully!');
    },
    onError: (err) => {
      toast.error(`Failed to delete reservation: ${err.message}`);
    },
  });

  const handleStatusChange = (id: string, newStatus: ReservationStatus): void => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  const handleDeleteReservation = (id: string): void => {
    deleteReservationMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Error: {error?.message}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table data-testid="reservations-table">
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Guests</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Requests</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations?.map((reservation) => (
            <TableRow key={reservation.id} data-testid={`reservation-row-${reservation.id}`}>
              <TableCell>{reservation.customerName}</TableCell>
              <TableCell>{reservation.customerEmail}</TableCell>
              <TableCell>{reservation.customerPhone}</TableCell>
              <TableCell>{reservation.numberOfGuests}</TableCell>
              <TableCell>{new Date(reservation.reservationDate).toLocaleDateString()}</TableCell>
              <TableCell>{reservation.reservationTime}</TableCell>
              <TableCell className="max-w-[200px] truncate">{reservation.specialRequests}</TableCell>
              <TableCell>
                <Select
                  value={reservation.status}
                  onValueChange={(newStatus: ReservationStatus) =>
                    handleStatusChange(reservation.id, newStatus)
                  }
                  data-testid={`reservation-status-select-${reservation.id}`}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="NO_SHOW">No Show</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>{new Date(reservation.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" data-testid={`delete-reservation-button-${reservation.id}`}>
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the reservation.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteReservation(reservation.id)}
                        data-testid={`confirm-delete-reservation-button-${reservation.id}`}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}