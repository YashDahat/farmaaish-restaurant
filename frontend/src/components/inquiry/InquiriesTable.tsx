import { CateringInquiryDto } from '@/types/inquiry';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface InquiriesTableProps {
  inquiries: CateringInquiryDto[];
}

export default function InquiriesTable({ inquiries }: InquiriesTableProps): JSX.Element {
  return (
    <div className="overflow-x-auto">
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
            <TableHead>Special Requests</TableHead>
            <TableHead>Inquiry Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries.map((inquiry) => (
            <TableRow key={inquiry.id} data-testid={`inquiry-row-${inquiry.id}`}>
              <TableCell>{inquiry.customerName}</TableCell>
              <TableCell>{inquiry.customerEmail}</TableCell>
              <TableCell>{inquiry.customerPhone}</TableCell>
              <TableCell>{inquiry.eventType}</TableCell>
              <TableCell>{new Date(inquiry.eventDate).toLocaleDateString()}</TableCell>
              <TableCell>{inquiry.numberOfGuests}</TableCell>
              <TableCell>
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
                  inquiry.budget,
                )}
              </TableCell>
              <TableCell>{inquiry.specialRequests}</TableCell>
              <TableCell>{new Date(inquiry.inquiryDate).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}