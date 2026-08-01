import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ReservationResponse } from '@/types/reservation';
import { Calendar, Clock, Users, User, Mail, Phone, Tag } from 'lucide-react';

interface ReservationSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
  reservationDetails: ReservationResponse | null;
}

export function ReservationSuccessDialog({
  isOpen,
  onClose,
  reservationDetails,
}: ReservationSuccessDialogProps) {
  if (!reservationDetails) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#800020]">
            Reservation Confirmed!
          </DialogTitle>
          <DialogDescription className="text-gray-700 mt-2">
            Thank you for booking your table at Farmaaish Restaurant. We look forward to serving you!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-3">
            <Tag className="h-5 w-5 text-[#D4AF37]" />
            <span className="font-semibold">Reservation ID:</span>
            <span className="text-gray-700">{reservationDetails.id ?? 'N/A'}</span>
          </div>
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-[#D4AF37]" />
            <span className="font-semibold">Customer Name:</span>
            <span className="text-gray-700">{reservationDetails.customerName ?? 'N/A'}</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-[#D4AF37]" />
            <span className="font-semibold">Email:</span>
            <span className="text-gray-700">{reservationDetails.customerEmail ?? 'N/A'}</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-[#D4AF37]" />
            <span className="font-semibold">Phone:</span>
            <span className="text-gray-700">{reservationDetails.customerPhone ?? 'N/A'}</span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-[#D4AF37]" />
            <span className="font-semibold">Date:</span>
            <span className="text-gray-700">{reservationDetails.reservationDate ?? 'N/A'}</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-[#D4AF37]" />
            <span className="font-semibold">Time:</span>
            <span className="text-gray-700">{reservationDetails.reservationTime ?? 'N/A'}</span>
          </div>
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-[#D4AF37]" />
            <span className="font-semibold">Party Size:</span>
            <span className="text-gray-700">{reservationDetails.partySize ?? 'N/A'}</span>
          </div>
          {reservationDetails.specialRequests && (
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-[#D4AF37]">Special Requests:</span>
              <p className="text-gray-700">{reservationDetails.specialRequests}</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={onClose}
            className="bg-[#D4AF37] hover:bg-[#b89a30] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
            data-testid="reservation-success-done-cta"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}