import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllActiveEvents, createEvent as createEventService, updateEvent as updateEventService } from '@/services/eventService';
import { deleteEvent as deleteEventService } from '@/services/apiService';
import { EventDto } from '@/types/event';

interface UseEventsResult {
  events: EventDto[];
  galleryItems: EventDto[];
  isLoading: boolean;
  error: Error | null;
  createEvent: (event: EventDto) => Promise<EventDto>;
  updateEvent: (id: string, event: EventDto) => Promise<EventDto>;
  deleteEvent: (id: string) => Promise<void>;
}

export const useEvents = (): UseEventsResult => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery<EventDto[], Error>({
    queryKey: ['events'],
    queryFn: getAllActiveEvents,
  });

  const createEventMutation = useMutation<EventDto, Error, EventDto>({
    mutationFn: createEventService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  const updateEventMutation = useMutation<EventDto, Error, { id: string; event: EventDto }>({
    mutationFn: ({ id, event }) => updateEventService(id, event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  const deleteEventMutation = useMutation<void, Error, string>({
    mutationFn: deleteEventService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  const events = data?.filter(event => event.eventType !== 'GALLERY') || [];
  const galleryItems = data?.filter(event => event.eventType === 'GALLERY') || [];

  return {
    events,
    galleryItems,
    isLoading,
    error: isError ? error : null,
    createEvent: (event: EventDto) => createEventMutation.mutateAsync(event),
    updateEvent: (id: string, event: EventDto) => updateEventMutation.mutateAsync({ id, event }),
    deleteEvent: (id: string) => deleteEventMutation.mutateAsync(id),
  };
};