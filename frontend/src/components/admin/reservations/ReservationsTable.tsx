import { useQueryClient, useQuery } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { deleteReservation, getAllReservations, updateReservation } from '@/services/reservationService';
import { Reservation, ReservationStatus } from '@/types/reservation';
import { toast } from 'sonner';

export default function ReservationsTable() {
  const queryClient = useQueryClient();
  const { data: reservations, isLoading, isError, error } = useQuery<Reservation[]>({
    queryKey: ['reservations'],
    queryFn: getAllReservations,
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteReservation(id);
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Reservation deleted successfully.');
    } catch (err) {
      toast.error('Failed to delete reservation.');
      console.error('Failed to delete reservation:', err);
    }
  };

  const handleUpdateStatus = async (id: string, status: ReservationStatus) => {
    try {
      const reservationToUpdate = reservations?.find(r => r.id === id);
      if (!reservationToUpdate) {
        toast.error('Reservation not found.');
        return;
      }
      await updateReservation(id, { ...reservationToUpdate, status });
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Reservation status updated successfully.');
    } catch (err) {
      toast.error('Failed to update reservation status.');
      console.error('Failed to update reservation status:', err);
    }
  };

  if (isLoading) {
    return <div>Loading reservations...</div>;
  }

  if (isError) {
    return <div>Error loading reservations: {error?.message}</div>;
  }

  return (
    <div className="rounded-md border">
      <Table data-testid="reservations-table">
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Guests</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Special Requests</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No reservations found.
              </TableCell>
            </TableRow>
          ) : (
            reservations?.map((reservation) => (
              <TableRow key={reservation.id} data-testid={`reservation-row-${reservation.id}`}>
                <TableCell>{reservation.customerName}</TableCell>
                <TableCell>
                  {reservation.reservationDate
                    ? new Date(reservation.reservationDate).toLocaleDateString('en-IN')
                    : 'N/A'}
                </TableCell>
                <TableCell>{reservation.reservationTime}</TableCell>
                <TableCell>{reservation.partySize}</TableCell>
                <TableCell>{reservation.status}</TableCell>
                <TableCell>{reservation.specialRequests ?? 'N/A'}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0" data-testid={`reservation-actions-${reservation.id}`}>
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleUpdateStatus(reservation.id, 'CONFIRMED')} data-testid={`reservation-status-confirmed-${reservation.id}`}>
                        Mark Confirmed
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUpdateStatus(reservation.id, 'CANCELLED')} data-testid={`reservation-status-cancelled-${reservation.id}`}>
                        Mark Cancelled
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUpdateStatus(reservation.id, 'COMPLETED')} data-testid={`reservation-status-completed-${reservation.id}`}>
                        Mark Completed
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(reservation.id)} data-testid={`reservation-delete-${reservation.id}`}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}