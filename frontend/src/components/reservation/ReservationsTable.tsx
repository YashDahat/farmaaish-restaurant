import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ReservationDto, ReservationStatus } from '@/types/reservation';
import { useDeleteReservation, useUpdateReservationStatus } from '@/hooks/useReservations';
import { toast } from 'sonner';
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

interface ReservationsTableProps {
  reservations: ReservationDto[];
}

export default function ReservationsTable({ reservations }: ReservationsTableProps): JSX.Element {
  const updateStatusMutation = useUpdateReservationStatus();
  const deleteReservationMutation = useDeleteReservation();
  const [openDialogId, setOpenDialogId] = useState<number | null>(null);

  const handleUpdateStatus = (id: number, status: ReservationStatus): void => {
    updateStatusMutation.mutate(
      { id, status },
      {
        onSuccess: () => {
          toast.success(`Reservation ${id} status updated to ${status}`);
        },
        onError: (error) => {
          toast.error(`Failed to update reservation status: ${error.message}`);
        },
      }
    );
  };

  const handleDeleteReservation = (id: number): void => {
    deleteReservationMutation.mutate(id, {
      onSuccess: () => {
        toast.success(`Reservation ${id} deleted successfully`);
        setOpenDialogId(null);
      },
      onError: (error) => {
        toast.error(`Failed to delete reservation: ${error.message}`);
        setOpenDialogId(null);
      },
    });
  };

  const getStatusBadgeVariant = (status: ReservationStatus): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status) {
      case 'PENDING':
        return 'secondary';
      case 'CONFIRMED':
        return 'default';
      case 'CANCELLED':
        return 'destructive';
      case 'COMPLETED':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const formatDateTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-GB');
  };

  const formatTime = (timeString: string): string => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <div className="overflow-x-auto">
      <Table data-testid="reservations-table">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Customer Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Party Size</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Special Requests</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id} data-testid={`reservation-row-${reservation.id}`}>
              <TableCell>{reservation.id}</TableCell>
              <TableCell>{reservation.customerName}</TableCell>
              <TableCell>{reservation.customerPhone}</TableCell>
              <TableCell>{reservation.customerEmail}</TableCell>
              <TableCell>{reservation.partySize}</TableCell>
              <TableCell>{formatDate(reservation.reservationDate)}</TableCell>
              <TableCell>{formatTime(reservation.reservationTime)}</TableCell>
              <TableCell className="max-w-[150px] truncate">{reservation.specialRequests}</TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(reservation.status)}>{reservation.status}</Badge>
              </TableCell>
              <TableCell>{formatDateTime(reservation.createdAt)}</TableCell>
              <TableCell className="flex space-x-2">
                {reservation.status === 'PENDING' && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUpdateStatus(reservation.id, 'CONFIRMED')}
                      disabled={updateStatusMutation.isPending}
                      data-testid={`confirm-reservation-${reservation.id}`}
                    >
                      Confirm
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleUpdateStatus(reservation.id, 'CANCELLED')}
                      disabled={updateStatusMutation.isPending}
                      data-testid={`cancel-reservation-${reservation.id}`}
                    >
                      Cancel
                    </Button>
                  </>
                )}
                <AlertDialog open={openDialogId === reservation.id} onOpenChange={(open) => setOpenDialogId(open ? reservation.id : null)}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      data-testid={`delete-reservation-trigger-${reservation.id}`}
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the reservation
                        and remove its data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteReservation(reservation.id)}
                        disabled={deleteReservationMutation.isPending}
                        data-testid={`delete-reservation-confirm-${reservation.id}`}
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