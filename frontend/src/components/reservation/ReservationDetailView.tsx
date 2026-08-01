import { useState, useEffect } from 'react';
import { ReservationResponse, ReservationStatus, UpdateReservationStatusRequest } from '@/types/reservation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateReservationStatus } from '@/services/reservationService';
import { toast } from 'sonner';

interface ReservationDetailViewProps {
  reservation: ReservationResponse | null;
  isOpen: boolean;
  onClose: () => void;
}

const ReservationDetailView = ({ reservation, isOpen, onClose }: ReservationDetailViewProps) => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<ReservationStatus | null>(reservation?.status ?? null);

  useEffect(() => {
    setStatus(reservation?.status ?? null);
  }, [reservation]);

  const updateStatusMutation = useMutation<
    ReservationResponse,
    Error,
    { id: string; request: UpdateReservationStatusRequest }
  >({
    mutationFn: ({ id, request }) => updateReservationStatus(id, request),
    onSuccess: () => {
      toast.success('Reservation status updated successfully.');
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      onClose();
    },
    onError: (error) => {
      toast.error(`Failed to update reservation status: ${error.message}`);
    },
  });

  const handleSaveStatus = () => {
    if (reservation?.id && status) {
      updateStatusMutation.mutate({ id: reservation.id, request: { status } });
    }
  };

  if (!reservation) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle data-testid="reservation-detail-title">Reservation Details</DialogTitle>
          <DialogDescription>View and update reservation information.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerName" className="text-right">
              Customer Name
            </Label>
            <Input id="customerName" value={reservation.customerName ?? ''} readOnly className="col-span-3" data-testid="reservation-customer-name" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerEmail" className="text-right">
              Email
            </Label>
            <Input id="customerEmail" value={reservation.customerEmail ?? ''} readOnly className="col-span-3" data-testid="reservation-customer-email" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerPhone" className="text-right">
              Phone
            </Label>
            <Input id="customerPhone" value={reservation.customerPhone ?? ''} readOnly className="col-span-3" data-testid="reservation-customer-phone" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="reservationDate" className="text-right">
              Date
            </Label>
            <Input id="reservationDate" value={reservation.reservationDate ?? ''} readOnly className="col-span-3" data-testid="reservation-date" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="reservationTime" className="text-right">
              Time
            </Label>
            <Input id="reservationTime" value={reservation.reservationTime ?? ''} readOnly className="col-span-3" data-testid="reservation-time" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="partySize" className="text-right">
              Party Size
            </Label>
            <Input id="partySize" value={reservation.partySize ?? ''} readOnly className="col-span-3" data-testid="reservation-party-size" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="specialRequests" className="text-right">
              Special Requests
            </Label>
            <Input id="specialRequests" value={reservation.specialRequests ?? ''} readOnly className="col-span-3" data-testid="reservation-special-requests" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select onValueChange={(value: ReservationStatus) => setStatus(value)} value={status ?? ''}>
              <SelectTrigger className="col-span-3" data-testid="reservation-status-select">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleSaveStatus}
            disabled={updateStatusMutation.isPending}
            className="bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold"
            data-testid="reservation-save-status-button"
          >
            {updateStatusMutation.isPending ? 'Saving...' : 'Save Status'}
          </Button>
          <Button type="button" variant="outline" onClick={onClose} data-testid="reservation-close-button">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationDetailView;