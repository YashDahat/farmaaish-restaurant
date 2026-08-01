import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ReservationResponse } from '@/types/reservation';

interface ReservationsTableProps {
  reservations: ReservationResponse[];
  onViewDetails: (reservation: ReservationResponse) => void;
}

export function ReservationsTable({ reservations, onViewDetails }: ReservationsTableProps) {
  return (
    <div className="rounded-md border">
      <Table data-testid="reservations-table">
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Reservation Date</TableHead>
            <TableHead>Reservation Time</TableHead>
            <TableHead>Party Size</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No reservations found.
              </TableCell>
            </TableRow>
          ) : (
            reservations.map((reservation) => (
              <TableRow key={reservation.id} data-testid={`reservation-row-${reservation.id}`}>
                <TableCell>{reservation.customerName}</TableCell>
                <TableCell>{reservation.reservationDate}</TableCell>
                <TableCell>{reservation.reservationTime}</TableCell>
                <TableCell>{reservation.partySize}</TableCell>
                <TableCell>{reservation.status}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(reservation)}
                    data-testid={`view-details-button-${reservation.id}`}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}