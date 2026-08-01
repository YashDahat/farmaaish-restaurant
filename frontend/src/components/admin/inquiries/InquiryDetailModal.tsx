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
import { CateringInquiryDto, InquiryStatus } from '@/types/inquiry';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCateringInquiryStatus } from '@/services/inquiryService';
import { toast } from 'sonner';
import { useState } from 'react';

interface InquiryDetailModalProps {
  inquiry: CateringInquiryDto;
  onClose: () => void;
}

const InquiryDetailModal: React.FC<InquiryDetailModalProps> = ({ inquiry, onClose }) => {
  const queryClient = useQueryClient();
  const [currentStatus, setCurrentStatus] = useState<InquiryStatus>(inquiry.inquiryStatus ?? 'NEW');

  const updateStatusMutation = useMutation({
    mutationFn: (id: string) => updateCateringInquiryStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cateringInquiries'] });
      toast.success('Inquiry status updated successfully.');
      onClose();
    },
    onError: (error) => {
      toast.error('Failed to update inquiry status.', {
        description: error.message,
      });
    },
  });

  const handleStatusChange = (newStatus: InquiryStatus) => {
    setCurrentStatus(newStatus);
  };

  const handleUpdateStatus = () => {
    if (inquiry.id) {
      updateStatusMutation.mutate(inquiry.id);
    }
  };

  const formatCurrency = (amount: number | null | undefined) => {
    if (amount === null || amount === undefined) return 'N/A';
    return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-[#36454F]">Inquiry Details</DialogTitle>
          <DialogDescription className="text-gray-600">
            View and manage the details of this catering inquiry.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerName" className="text-right font-medium text-[#36454F]">
              Customer Name
            </Label>
            <span id="customerName" className="col-span-3 text-gray-800">
              {inquiry.customerName ?? 'N/A'}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerEmail" className="text-right font-medium text-[#36454F]">
              Email
            </Label>
            <span id="customerEmail" className="col-span-3 text-gray-800">
              {inquiry.customerEmail ?? 'N/A'}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="customerPhone" className="text-right font-medium text-[#36454F]">
              Phone
            </Label>
            <span id="customerPhone" className="col-span-3 text-gray-800">
              {inquiry.customerPhone ?? 'N/A'}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="eventType" className="text-right font-medium text-[#36454F]">
              Event Type
            </Label>
            <span id="eventType" className="col-span-3 text-gray-800">
              {inquiry.eventType ?? 'N/A'}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="eventDate" className="text-right font-medium text-[#36454F]">
              Event Date
            </Label>
            <span id="eventDate" className="col-span-3 text-gray-800">
              {inquiry.eventDate ? new Date(inquiry.eventDate).toLocaleDateString() : 'N/A'}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="numberOfGuests" className="text-right font-medium text-[#36454F]">
              Number of Guests
            </Label>
            <span id="numberOfGuests" className="col-span-3 text-gray-800">
              {inquiry.numberOfGuests ?? 'N/A'}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="budget" className="text-right font-medium text-[#36454F]">
              Budget
            </Label>
            <span id="budget" className="col-span-3 text-gray-800">
              {formatCurrency(inquiry.budget)}
            </span>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="message" className="text-right font-medium text-[#36454F] pt-2">
              Message
            </Label>
            <span id="message" className="col-span-3 text-gray-800 break-words">
              {inquiry.message ?? 'N/A'}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="inquiryStatus" className="text-right font-medium text-[#36454F]">
              Status
            </Label>
            <Select
              onValueChange={(value: InquiryStatus) => handleStatusChange(value)}
              value={currentStatus}
              disabled={updateStatusMutation.isPending}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NEW">New</SelectItem>
                <SelectItem value="CONTACTED">Contacted</SelectItem>
                <SelectItem value="CLOSED">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="createdAt" className="text-right font-medium text-[#36454F]">
              Created At
            </Label>
            <span id="createdAt" className="col-span-3 text-gray-800">
              {inquiry.createdAt ? new Date(inquiry.createdAt).toLocaleString() : 'N/A'}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="updatedAt" className="text-right font-medium text-[#36454F]">
              Last Updated
            </Label>
            <span id="updatedAt" className="col-span-3 text-gray-800">
              {inquiry.updatedAt ? new Date(inquiry.updatedAt).toLocaleString() : 'N/A'}
            </span>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="bg-[#36454F] hover:bg-[#2a353c] text-white font-semibold rounded-md px-6 py-2 transition-all duration-200"
          >
            Close
          </Button>
          <Button
            type="submit"
            onClick={handleUpdateStatus}
            disabled={updateStatusMutation.isPending || currentStatus === inquiry.inquiryStatus}
            className="bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-md px-6 py-2 transition-all duration-200"
          >
            {updateStatusMutation.isPending ? 'Updating...' : 'Update Status'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InquiryDetailModal;