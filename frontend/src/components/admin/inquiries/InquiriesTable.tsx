import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useInquiries } from '@/hooks/useInquiries';
import { InquiryDto, InquiryStatus } from '@/types/inquiry';
import { format } from 'date-fns';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

export default function InquiriesTable() {
  const {
    inquiries,
    isLoadingInquiries,
    isErrorInquiries,
    inquiriesError,
    updateInquiryStatus,
    deleteInquiry,
  } = useInquiries();

  const handleUpdateStatus = (id: string, currentStatus: InquiryStatus) => {
    // This assumes updateInquiryStatus toggles to the next logical status, or a specific status is passed.
    // For simplicity, let's assume it advances the status. The backend API updateInquiryStatus
    // does not take a status parameter, implying it has internal logic to advance the status.
    updateInquiryStatus(id, {
      onSuccess: () => {
        toast.success('Inquiry status updated successfully.');
      },
      onError: (error) => {
        toast.error(`Failed to update inquiry status: ${error.message}`);
      },
    });
  };

  const handleDeleteInquiry = (id: string) => {
    deleteInquiry(id, {
      onSuccess: () => {
        toast.success('Inquiry deleted successfully.');
      },
      onError: (error) => {
        toast.error(`Failed to delete inquiry: ${error.message}`);
      },
    });
  };

  if (isLoadingInquiries) {
    return <div>Loading inquiries...</div>;
  }

  if (isErrorInquiries) {
    return <div>Error loading inquiries: {inquiriesError?.message}</div>;
  }

  return (
    <div className="rounded-md border">
      <Table data-testid="inquiries-table">
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Event Type</TableHead>
            <TableHead>Event Date</TableHead>
            <TableHead>Inquiry Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No inquiries found.
              </TableCell>
            </TableRow>
          ) : (
            inquiries?.map((inquiry: InquiryDto) => (
              <TableRow key={inquiry.id} data-testid={`inquiry-row-${inquiry.id}`}>
                <TableCell>{inquiry.customerName}</TableCell>
                <TableCell>{inquiry.eventType}</TableCell>
                <TableCell>
                  {inquiry.eventDate ? format(new Date(inquiry.eventDate), 'dd/MM/yyyy') : 'N/A'}
                </TableCell>
                <TableCell>
                  {inquiry.inquiryDate ? format(new Date(inquiry.inquiryDate), 'dd/MM/yyyy') : 'N/A'}
                </TableCell>
                <TableCell>{inquiry.status}</TableCell>
                <TableCell>{inquiry.message}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0" data-testid={`inquiry-actions-${inquiry.id}`}>
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleUpdateStatus(inquiry.id!, inquiry.status!)}
                        data-testid={`inquiry-update-status-${inquiry.id}`}
                      >
                        Update Status
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteInquiry(inquiry.id!)}
                        data-testid={`inquiry-delete-${inquiry.id}`}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}