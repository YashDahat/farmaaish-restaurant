import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CateringInquiryDto } from '@/types/inquiry';

interface InquiriesTableProps {
  inquiries: CateringInquiryDto[];
  onViewDetails: (inquiry: CateringInquiryDto) => void;
}

export function InquiriesTable({ inquiries, onViewDetails }: InquiriesTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table data-testid="inquiries-table">
        <TableHeader>
          <TableRow>
            <TableHead>Customer Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Event Type</TableHead>
            <TableHead>Event Date</TableHead>
            <TableHead>Guests</TableHead>
            <TableHead>Budget</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                No inquiries found.
              </TableCell>
            </TableRow>
          ) : (
            inquiries.map((inquiry) => (
              <TableRow key={inquiry.id} data-testid="inquiry-row">
                <TableCell>{inquiry.customerName}</TableCell>
                <TableCell>{inquiry.customerEmail}</TableCell>
                <TableCell>{inquiry.eventType}</TableCell>
                <TableCell>{inquiry.eventDate}</TableCell>
                <TableCell>{inquiry.numberOfGuests}</TableCell>
                <TableCell>
                  {inquiry.budget?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                </TableCell>
                <TableCell>{inquiry.inquiryStatus}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(inquiry)}
                    data-testid="view-details-button"
                  >
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