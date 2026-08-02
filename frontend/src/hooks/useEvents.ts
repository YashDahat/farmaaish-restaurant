import { useQuery } from '@tanstack/react-query';
import { getAllActiveEvents } from '@/services/eventService';
import { EventDto } from '@/types/event';

interface UseEventsResult {
  events: EventDto[];
  galleryItems: EventDto[];
  isLoading: boolean;
  error: Error | null;
}

export const useEvents = (): UseEventsResult => {
  const { data, isLoading, isError, error } = useQuery<EventDto[], Error>({
    queryKey: ['events'],
    queryFn: getAllActiveEvents,
  });

  const events = data?.filter(event => event.eventType !== 'GALLERY') || [];
  const galleryItems = data?.filter(event => event.eventType === 'GALLERY') || [];

  return {
    events,
    galleryItems,
    isLoading,
    error: isError ? error : null,
  };
};