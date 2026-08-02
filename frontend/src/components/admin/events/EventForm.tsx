import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EventDto } from '@/types/event';
import { useEvents } from '@/hooks/useEvents';
import { toast } from 'sonner';
import { useEffect } from 'react';

const eventFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  eventDate: z.date().optional().nullable(),
  eventType: z.enum(['EVENT', 'GALLERY'], {
    required_error: 'Event type is required',
  }),
  active: z.boolean().default(true),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

interface EventFormProps {
  initialData?: EventDto;
  onSuccess?: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ initialData, onSuccess }) => {
  const { createEvent, updateEvent } = useEvents();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: initialData?.title ?? '',
      description: initialData?.description ?? '',
      imageUrl: initialData?.imageUrl ?? '',
      eventDate: initialData?.eventDate ? new Date(initialData.eventDate) : undefined,
      eventType: (initialData?.eventType as 'EVENT' | 'GALLERY') ?? 'EVENT',
      active: initialData?.active ?? true,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title ?? '',
        description: initialData.description ?? '',
        imageUrl: initialData.imageUrl ?? '',
        eventDate: initialData.eventDate ? new Date(initialData.eventDate) : undefined,
        eventType: (initialData.eventType as 'EVENT' | 'GALLERY') ?? 'EVENT',
        active: initialData.active ?? true,
      });
    }
  }, [initialData, form]);

  const onSubmit = async (values: EventFormValues) => {
    try {
      const eventData: EventDto = {
        id: initialData?.id ?? null,
        title: values.title,
        description: values.description,
        imageUrl: values.imageUrl,
        eventDate: values.eventDate ? format(values.eventDate, 'yyyy-MM-dd') : null,
        eventType: values.eventType,
        active: values.active,
      };

      if (initialData?.id) {
        await updateEvent(initialData.id, eventData);
        toast.success('Event updated successfully.');
      } else {
        await createEvent(eventData);
        toast.success('Event created successfully.');
      }
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to save event.');
      console.error('Failed to save event:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Event title" {...field} data-testid="event-title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Event description" {...field} data-testid="event-description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} data-testid="event-imageUrl" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eventDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Event Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                      data-testid="event-date-picker"
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ?? undefined}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="eventType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} data-testid="event-type-select">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="EVENT">Event</SelectItem>
                  <SelectItem value="GALLERY">Gallery</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  data-testid="event-active-checkbox"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Active</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Whether this event is currently active and visible.
                </p>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-[#D4AF37] hover:bg-[#b89a30] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="event-submit">
          {initialData ? 'Update Event' : 'Create Event'}
        </Button>
      </form>
    </Form>
  );
};

export default EventForm;