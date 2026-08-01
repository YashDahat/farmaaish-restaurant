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
import { ReservationResponse, ReservationStatus } from '@/types/reservation';

interface ReservationsTableProps {
  reservations: ReservationResponse[];
  onViewDetails: (reservation: ReservationResponse) => void;
}

const ReservationsTable: React.FC<ReservationsTableProps> = ({ reservations, onViewDetails }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReservations = reservations.slice(startIndex, endIndex);

  const totalPages = Math.ceil(reservations.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const getStatusColor = (status: ReservationStatus | null) => {
    switch (status) {
      case 'PENDING':
        return 'text-yellow-600';
      case 'CONFIRMED':
        return 'text-green-600';
      case 'CANCELLED':
        return 'text-red-600';
      case 'COMPLETED':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table data-testid="reservations-table">
          <TableHeader>
            <TableRow>
              <TableHead>Customer Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Party Size</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentReservations.length > 0 ? (
              currentReservations.map((reservation) => (
                <TableRow key={reservation.id} data-testid="reservation-card">
                  <TableCell>{reservation.customerName}</TableCell>
                  <TableCell>{reservation.customerEmail}</TableCell>
                  <TableCell>{reservation.customerPhone}</TableCell>
                  <TableCell>{reservation.reservationDate}</TableCell>
                  <TableCell>{reservation.reservationTime}</TableCell>
                  <TableCell>{reservation.partySize}</TableCell>
                  <TableCell className={getStatusColor(reservation.status)}>
                    {reservation.status}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewDetails(reservation)}
                      data-testid="view-details-button"
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  No reservations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {reservations.length > itemsPerPage && (
        <div className="flex justify-end space-x-2">
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-[#36454F] hover:bg-[#2a353c] text-white font-semibold rounded-md px-4 py-2 transition-all duration-200"
            data-testid="previous-page-button"
          >
            Previous
          </Button>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-[#36454F] hover:bg-[#2a353c] text-white font-semibold rounded-md px-4 py-2 transition-all duration-200"
            data-testid="next-page-button"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReservationsTable;