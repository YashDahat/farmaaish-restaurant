import AdminLayout from '@/components/AdminLayout';
import EventsTable from '@/components/admin/events/EventsTable';
import EventForm from '@/components/admin/events/EventForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import { EventDto } from '@/types/event';
import { useEvents } from '@/hooks/useEvents';
import { toast } from 'sonner';

export default function AdminEventsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventDto | undefined>(undefined);
  const { deleteEvent } = useEvents();

  const handleCreateNewEvent = () => {
    setSelectedEvent(undefined);
    setIsFormOpen(true);
  };

  const handleEditEvent = (event: EventDto) => {
    setSelectedEvent(event);
    setIsFormOpen(true);
  };

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        toast.success('Event deleted successfully.');
      } catch (error) {
        toast.error('Failed to delete event.');
        console.error('Failed to delete event:', error);
      }
    }
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setSelectedEvent(undefined);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Events Management</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={handleCreateNewEvent}
              className="bg-[#D4AF37] hover:bg-[#b89a30] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
              data-testid="create-event-cta"
            >
              Create New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedEvent ? 'Edit Event' : 'Create New Event'}</DialogTitle>
            </DialogHeader>
            <EventForm initialData={selectedEvent} onSuccess={handleFormSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-8">
        <EventsTable onEdit={handleEditEvent} onDelete={handleDeleteEvent} />
      </div>
    </AdminLayout>
  );
}