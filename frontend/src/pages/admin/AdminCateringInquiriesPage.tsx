import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminLayout } from '@/components/AdminLayout';
import {
  getAllCateringInquiries,
  updateCateringInquiryStatus,
  getCateringInquiryById,
} from '@/services/inquiryService';
import { CateringInquiryDto, InquiryStatus } from '@/types/inquiry';
import { InquiriesTable } from '@/components/admin/inquiries/InquiriesTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function AdminCateringInquiriesPage() {
  const queryClient = useQueryClient();
  const [selectedInquiry, setSelectedInquiry] = useState<CateringInquiryDto | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const { data: inquiries, isLoading, error } = useQuery<CateringInquiryDto[]>({
    queryKey: ['cateringInquiries'],
    queryFn: getAllCateringInquiries,
  });

  const updateStatusMutation = useMutation({
    mutationFn: (id: string) => updateCateringInquiryStatus(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cateringInquiries'] });
      toast.success('Inquiry status updated successfully.');
      setIsDetailModalOpen(false);
    },
    onError: (err) => {
      toast.error(`Failed to update inquiry status: ${err.message}`);
    },
  });

  const handleViewDetails = async (inquiry: CateringInquiryDto) => {
    if (inquiry.id) {
      try {
        const fullInquiry = await getCateringInquiryById(inquiry.id);
        setSelectedInquiry(fullInquiry);
        setIsDetailModalOpen(true);
      } catch (error) {
        toast.error('Failed to load inquiry details.');
      }
    }
  };

  const handleUpdateStatus = () => {
    if (selectedInquiry?.id) {
      updateStatusMutation.mutate(selectedInquiry.id);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-semibold text-[#36454F] mb-6">
              Catering Inquiries
            </h1>
            <div>Loading inquiries...</div>
          </div>
        </section>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-semibold text-[#36454F] mb-6">
              Catering Inquiries
            </h1>
            <div className="text-red-500">Error loading inquiries: {error.message}</div>
          </div>
        </section>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#36454F] mb-6">
            Catering Inquiries
          </h1>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <InquiriesTable inquiries={inquiries ?? []} onViewDetails={handleViewDetails} />
          </div>

          <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Inquiry Details</DialogTitle>
                <DialogDescription>View and update the status of this catering inquiry.</DialogDescription>
              </DialogHeader>
              {selectedInquiry && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="customerName" className="text-right">
                      Customer Name
                    </Label>
                    <span className="col-span-3">{selectedInquiry.customerName}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="customerEmail" className="text-right">
                      Email
                    </Label>
                    <span className="col-span-3">{selectedInquiry.customerEmail}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="customerPhone" className="text-right">
                      Phone
                    </Label>
                    <span className="col-span-3">{selectedInquiry.customerPhone}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="eventType" className="text-right">
                      Event Type
                    </Label>
                    <span className="col-span-3">{selectedInquiry.eventType}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="eventDate" className="text-right">
                      Event Date
                    </Label>
                    <span className="col-span-3">{selectedInquiry.eventDate}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="numberOfGuests" className="text-right">
                      Number of Guests
                    </Label>
                    <span className="col-span-3">{selectedInquiry.numberOfGuests}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="budget" className="text-right">
                      Budget
                    </Label>
                    <span className="col-span-3">
                      {selectedInquiry.budget?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="message" className="text-right">
                      Message
                    </Label>
                    <span className="col-span-3">{selectedInquiry.message}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select
                      value={selectedInquiry.inquiryStatus ?? ''}
                      onValueChange={(value: InquiryStatus) =>
                        setSelectedInquiry((prev) => (prev ? { ...prev, inquiryStatus: value } : null))
                      }
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
                </div>
              )}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
                  Close
                </Button>
                <Button
                  onClick={handleUpdateStatus}
                  disabled={updateStatusMutation.isPending}
                  className="bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-md px-6 py-2 transition-all duration-200"
                >
                  {updateStatusMutation.isPending ? 'Updating...' : 'Update Status'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </AdminLayout>
  );
}