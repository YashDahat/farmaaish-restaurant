import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useState, useEffect } from 'react';
import type { ReservationResponse, ReservationStatus } from '@/types/reservation';

interface UpdateReservationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string, status: ReservationStatus) => void;
  reservationToUpdate: ReservationResponse | null;
  isLoading: boolean;
}

export default function UpdateReservationDialog({
  isOpen,
  onClose,
  onConfirm,
  reservationToUpdate,
  isLoading,
}: UpdateReservationDialogProps): JSX.Element {
  const [selectedStatus, setSelectedStatus] = useState<ReservationStatus | ''>('');

  useEffect(() => {
    if (reservationToUpdate) {
      setSelectedStatus(reservationToUpdate.status);
    } else {
      setSelectedStatus('');
    }
  }, [reservationToUpdate]);

  const handleConfirm = (): void => {
    if (reservationToUpdate && selectedStatus) {
      onConfirm(reservationToUpdate.id, selectedStatus);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Reservation Status</DialogTitle>
        </DialogHeader>
        {reservationToUpdate ? (
          <div className="grid gap-4 py-4">
            <p className="text-sm text-gray-500">
              Update status for reservation by{' '}
              <span className="font-semibold">{reservationToUpdate.customerName}</span> (ID:{' '}
              {reservationToUpdate.id})
            </p>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                onValueChange={(value: ReservationStatus) => setSelectedStatus(value)}
                value={selectedStatus}
                disabled={isLoading}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ) : (
          <p>No reservation selected.</p>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            className="bg-[#D4AF37] hover:bg-[#C2A032] text-[#36454F]"
            onClick={handleConfirm}
            disabled={isLoading || !selectedStatus || !reservationToUpdate}
            data-testid="update-reservation-status-confirm"
          >
            {isLoading ? 'Updating...' : 'Update Status'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}