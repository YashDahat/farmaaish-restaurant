import type { JSX } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ReservationResponse, ReservationStatus } from '@/types/reservation';
import { format } from 'date-fns';

interface ReservationsTableProps {
  reservations: ReservationResponse[];
  onUpdateStatus: (id: string, status: ReservationStatus) => void;
}

export function ReservationsTable({ reservations, onUpdateStatus }: ReservationsTableProps): JSX.Element {
  return (
    <div className="overflow-x-auto">
      <Table data-testid="reservations-table">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Customer Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Guests</TableHead>
            <TableHead>Requests</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id} data-testid={`reservation-row-${reservation.id}`}>
              <TableCell className="font-medium">{reservation.customerName}</TableCell>
              <TableCell>{reservation.customerEmail}</TableCell>
              <TableCell>{reservation.customerPhone}</TableCell>
              <TableCell>{format(new Date(reservation.reservationTime), 'MMM dd, yyyy hh:mm a')}</TableCell>
              <TableCell>{reservation.numberOfGuests}</TableCell>
              <TableCell className="max-w-[200px] truncate">{reservation.specialRequests}</TableCell>
              <TableCell>{reservation.status}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateStatus(reservation.id, reservation.status)}
                  data-testid={`update-status-button-${reservation.id}`}
                >
                  Update Status
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}