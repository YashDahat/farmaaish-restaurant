import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { EventDto } from '@/types/event';
import { useEvents } from '@/hooks/useEvents';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface EventsTableProps {
  onEdit: (event: EventDto) => void;
  onDelete: (id: string) => void;
}

export default function EventsTable({ onEdit, onDelete }: EventsTableProps) {
  const { events, isLoading, error } = useEvents();

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading events: {error.message}</div>;
  }

  return (
    <div className="rounded-md border">
      <Table data-testid="events-table">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Event Type</TableHead>
            <TableHead>Event Date</TableHead>
            <TableHead>Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No events found.
              </TableCell>
            </TableRow>
          ) : (
            events.map((event) => (
              <TableRow key={event.id} data-testid={`event-row-${event.id}`}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.eventType}</TableCell>
                <TableCell>
                  {event.eventDate
                    ? new Date(event.eventDate).toLocaleDateString('en-IN')
                    : 'N/A'}
                </TableCell>
                <TableCell>{event.active ? 'Yes' : 'No'}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(event)}
                    data-testid={`edit-event-${event.id}`}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(event.id!)}
                    data-testid={`delete-event-${event.id}`}
                  >
                    <Trash2Icon className="h-4 w-4" />
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