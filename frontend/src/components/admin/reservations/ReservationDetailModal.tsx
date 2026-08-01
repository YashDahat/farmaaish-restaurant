import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ReservationResponse, ReservationStatus } from '@/types/reservation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateReservationStatus } from '@/services/reservationService';
import { toast } from 'sonner';

interface ReservationDetailModalProps {
  reservation: ReservationResponse;
  onClose: () => void;
}

export const ReservationDetailModal = ({ reservation, onClose }: ReservationDetailModalProps) => {
  const queryClient = useQueryClient();

  const updateStatusMutation = useMutation({
    mutationFn: (newStatus: ReservationStatus) => {
      if (!reservation.id) {
        throw new Error('Reservation ID is missing');
      }
      return updateReservationStatus(reservation.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Reservation status updated successfully.');
      onClose();
    },
    onError: (error) => {
      toast.error(`Failed to update reservation status: ${error.message}`);
    },
  });

  const handleStatusChange = (newStatus: ReservationStatus) => {
    if (reservation.id) {
      updateStatusMutation.mutate(newStatus);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#36454F]">Reservation Details</DialogTitle>
          <DialogDescription className="text-gray-600">
            View and update the status of this reservation.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerName" className="text-right text-[#36454F]">
              Customer Name
            </Label>
            <span id="customerName" className="col-span-3 text-gray-800">
              {reservation.customerName}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerEmail" className="text-right text-[#36454F]">
              Email
            </Label>
            <span id="customerEmail" className="col-span-3 text-gray-800">
              {reservation.customerEmail}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerPhone" className="text-right text-[#36454F]">
              Phone
            </Label>
            <span id="customerPhone" className="col-span-3 text-gray-800">
              {reservation.customerPhone}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="reservationDate" className="text-right text-[#36454F]">
              Date
            </Label>
            <span id="reservationDate" className="col-span-3 text-gray-800">
              {reservation.reservationDate}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="reservationTime" className="text-right text-[#36454F]">
              Time
            </Label>
            <span id="reservationTime" className="col-span-3 text-gray-800">
              {reservation.reservationTime}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="partySize" className="text-right text-[#36454F]">
              Party Size
            </Label>
            <span id="partySize" className="col-span-3 text-gray-800">
              {reservation.partySize}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right text-[#36454F]">
              Status
            </Label>
            <Select
              onValueChange={(value: ReservationStatus) => handleStatusChange(value)}
              value={reservation.status ?? ''}
              disabled={updateStatusMutation.isPending}
            >
              <SelectTrigger className="col-span-3 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37]">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="createdAt" className="text-right text-[#36454F]">
              Created At
            </Label>
            <span id="createdAt" className="col-span-3 text-gray-800">
              {reservation.createdAt ? new Date(reservation.createdAt).toLocaleString() : 'N/A'}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="updatedAt" className="text-right text-[#36454F]">
              Updated At
            </Label>
            <span id="updatedAt" className="col-span-3 text-gray-800">
              {reservation.updatedAt ? new Date(reservation.updatedAt).toLocaleString() : 'N/A'}
            </span>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={onClose}
            className="bg-[#36454F] hover:bg-[#2a353c] text-white font-semibold rounded-md px-6 py-2 transition-all duration-200"
            data-testid="reservation-detail-close-button"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};