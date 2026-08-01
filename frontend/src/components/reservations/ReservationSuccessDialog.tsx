import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';

interface ReservationSuccessDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReservationSuccessDialog({ isOpen, onClose }: ReservationSuccessDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-[#D4AF37] mb-4" />
          <DialogTitle className="text-2xl font-semibold text-[#36454F]">Reservation Confirmed!</DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Your reservation at Farmaaish Restaurant has been successfully placed! We look forward to welcoming you.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-4 mt-6">
          <Button
            onClick={onClose}
            className="bg-[#D4AF37] hover:bg-[#C2A032] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
            data-testid="reservation-success-close-button"
          >
            Close
          </Button>
          <Link to={ROUTES.HOME}>
            <Button
              variant="outline"
              className="w-full sm:w-auto border-[#D4AF37] text-[#D4AF37] hover:bg-gray-100 font-semibold rounded-full px-8 py-3 transition-all duration-200"
              onClick={onClose}
              data-testid="reservation-success-home-button"
            >
              Go to Home
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}