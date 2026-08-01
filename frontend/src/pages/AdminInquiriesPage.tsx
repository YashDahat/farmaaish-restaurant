import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { format } from 'date-fns';
import {
  getAllInquiries,
  updateInquiryStatus,
} from '@/services/inquiryService';
import type { InquiryResponse, InquiryStatus, UpdateInquiryStatusRequest } from '@/types/inquiry';
import AdminLayout from '@/components/AdminLayout';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const InquiryDetailView = ({
  inquiry,
  onClose,
}: {
  inquiry: InquiryResponse;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<InquiryStatus>(inquiry.status as InquiryStatus);

  const updateStatusMutation = useMutation<
    InquiryResponse,
    Error,
    { id: string; request: UpdateInquiryStatusRequest }
  >({
    mutationFn: ({ id, request }) => updateInquiryStatus(id, request),
    onSuccess: () => {
      toast.success('Inquiry status updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
      onClose();
    },
    onError: (error) => {
      toast.error(`Failed to update inquiry status: ${error.message}`);
    },
  });

  const handleSaveStatus = () => {
    if (inquiry.id && status) {
      updateStatusMutation.mutate({ id: inquiry.id, request: { status } });
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Inquiry Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="font-medium">Customer Name:</Label>
          <p>{inquiry.customerName}</p>
        </div>
        <div>
          <Label className="font-medium">Customer Email:</Label>
          <p>{inquiry.customerEmail}</p>
        </div>
        <div>
          <Label className="font-medium">Customer Phone:</Label>
          <p>{inquiry.customerPhone}</p>
        </div>
        <div>
          <Label className="font-medium">Event Type:</Label>
          <p>{inquiry.eventType}</p>
        </div>
        <div>
          <Label className="font-medium">Event Date:</Label>
          <p>{inquiry.eventDate ? format(new Date(inquiry.eventDate), 'PPP') : 'N/A'}</p>
        </div>
        <div>
          <Label className="font-medium">Number of Guests:</Label>
          <p>{inquiry.numberOfGuests}</p>
        </div>
        <div>
          <Label className="font-medium">Budget:</Label>
          <p>{inquiry.budget?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</p>
        </div>
        <div className="col-span-2">
          <Label className="font-medium">Special Requests:</Label>
          <p>{inquiry.specialRequests}</p>
        </div>
        <div>
          <Label className="font-medium">Created At:</Label>
          <p>{inquiry.createdAt ? format(new Date(inquiry.createdAt), 'PPP p') : 'N/A'}</p>
        </div>
        <div>
          <Label className="font-medium">Updated At:</Label>
          <p>{inquiry.updatedAt ? format(new Date(inquiry.updatedAt), 'PPP p') : 'N/A'}</p>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex items-center space-x-2">
        <Label htmlFor="status" className="font-medium">
          Status:
        </Label>
        <Select
          value={status}
          onValueChange={(value: InquiryStatus) => setStatus(value)}
          disabled={updateStatusMutation.isPending}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NEW">NEW</SelectItem>
            <SelectItem value="CONTACTED">CONTACTED</SelectItem>
            <SelectItem value="CLOSED">CLOSED</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={handleSaveStatus}
          disabled={updateStatusMutation.isPending || status === inquiry.status}
          className="bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold transition-all duration-200"
          data-testid="update-inquiry-status-button"
        >
          {updateStatusMutation.isPending ? 'Saving...' : 'Save Status'}
        </Button>
      </div>
    </div>
  );
};

const AdminInquiriesPage = () => {
  const {
    data: inquiries,
    isLoading,
    isError,
    error,
  } = useQuery<InquiryResponse[], Error>({
    queryKey: ['inquiries'],
    queryFn: getAllInquiries,
  });

  const [selectedInquiry, setSelectedInquiry] = useState<InquiryResponse | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleViewDetails = (inquiry: InquiryResponse) => {
    setSelectedInquiry(inquiry);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedInquiry(null);
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-semibold mb-6">Inquiry Management</h1>
            <Skeleton className="h-[500px] w-full" />
          </div>
        </section>
      </AdminLayout>
    );
  }

  if (isError) {
    return (
      <AdminLayout>
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-semibold mb-6">Inquiry Management</h1>
            <p className="text-red-500">Error loading inquiries: {error?.message}</p>
          </div>
        </section>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold mb-6">Inquiry Management</h1>

          {inquiries && inquiries.length > 0 ? (
            <div className="overflow-x-auto">
              <Table data-testid="inquiries-table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Event Type</TableHead>
                    <TableHead>Event Date</TableHead>
                    <TableHead>Guests</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inquiries.map((inquiry) => (
                    <TableRow key={inquiry.id} data-testid="inquiry-row">
                      <TableCell>{inquiry.customerName}</TableCell>
                      <TableCell>{inquiry.eventType}</TableCell>
                      <TableCell>
                        {inquiry.eventDate ? format(new Date(inquiry.eventDate), 'PPP') : 'N/A'}
                      </TableCell>
                      <TableCell>{inquiry.numberOfGuests}</TableCell>
                      <TableCell>
                        {inquiry.budget?.toLocaleString('en-IN', {
                          style: 'currency',
                          currency: 'INR',
                        })}
                      </TableCell>
                      <TableCell>{inquiry.status}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(inquiry)}
                          data-testid={`view-details-button-${inquiry.id}`}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No inquiries found.</p>
            </div>
          )}

          <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Inquiry Details</DialogTitle>
                <DialogDescription>View and update the status of this inquiry.</DialogDescription>
              </DialogHeader>
              {selectedInquiry && (
                <InquiryDetailView inquiry={selectedInquiry} onClose={handleCloseDetailModal} />
              )}
              <DialogFooter>
                <Button variant="outline" onClick={handleCloseDetailModal}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminInquiriesPage;