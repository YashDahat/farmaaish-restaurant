'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CateringInquiryDto, InquiryStatus } from '@/types/inquiry';
import { getAllInquiries, updateInquiryStatus } from '@/services/inquiryService';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export default function InquiriesTable(): React.JSX.Element {
  const queryClient = useQueryClient();
  const { data: inquiries, isLoading, isError, error } = useQuery<CateringInquiryDto[], Error>({
    queryKey: ['cateringInquiries'],
    queryFn: getAllInquiries,
  });

  const updateStatusMutation = useMutation<CateringInquiryDto, Error, { id: string; status: InquiryStatus }>({
    mutationFn: ({ id, status }) => updateInquiryStatus(id, { status }), // Assuming updateInquiryStatus takes an object with status
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cateringInquiries'] });
      toast.success('Inquiry status updated successfully.');
    },
    onError: (err) => {
      toast.error(`Failed to update inquiry status: ${err.message}`);
    },
  });

  const handleStatusChange = (id: string, newStatus: InquiryStatus) => {
    updateStatusMutation.mutate({ id, status: newStatus });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Error loading inquiries: {error?.message}</div>;
  }

  return (
    <div className="rounded-md border">
      <Table data-testid="inquiries-table">
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Event Type</TableHead>
            <TableHead>Event Date</TableHead>
            <TableHead>Guests</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                No catering inquiries found.
              </TableCell>
            </TableRow>
          ) : (
            inquiries?.map((inquiry) => (
              <TableRow key={inquiry.id} data-testid={`inquiry-row-${inquiry.id}`}>
                <TableCell>{inquiry.customerName}</TableCell>
                <TableCell>{inquiry.customerEmail}</TableCell>
                <TableCell>{inquiry.customerPhone}</TableCell>
                <TableCell>{inquiry.eventType}</TableCell>
                <TableCell>{format(new Date(inquiry.eventDate), 'PPP')}</TableCell>
                <TableCell>{inquiry.numberOfGuests}</TableCell>
                <TableCell>
                  {inquiry.budget.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                </TableCell>
                <TableCell>
                  <Select
                    value={inquiry.status}
                    onValueChange={(newStatus: InquiryStatus) => handleStatusChange(inquiry.id, newStatus)}
                    disabled={updateStatusMutation.isPending}
                  >
                    <SelectTrigger className="w-[180px]" data-testid={`inquiry-status-select-${inquiry.id}`}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NEW">New</SelectItem>
                      <SelectItem value="CONTACTED">Contacted</SelectItem>
                      <SelectItem value="QUOTED">Quoted</SelectItem>
                      <SelectItem value="CLOSED">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" data-testid={`inquiry-view-details-${inquiry.id}`}>
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}