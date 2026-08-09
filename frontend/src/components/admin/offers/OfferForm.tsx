import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { CalendarIcon } from 'lucide-react';

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
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import {
  createSpecialOffer,
  updateSpecialOffer,
} from '@/services/offerService';
import { SpecialOfferDto } from '@/types/offer';
import { useQueryClient } from '@tanstack/react-query';

const offerFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  discountPercentage: z.coerce.number().min(0).max(100, 'Discount must be between 0 and 100'),
  startDate: z.date({ required_error: 'Start date is required' }),
  endDate: z.date({ required_error: 'End date is required' }),
  imageUrl: z.string().url('Must be a valid URL').min(1, 'Image URL is required'),
  isActive: z.boolean(),
}).refine((data) => data.endDate >= data.startDate, {
  message: 'End date cannot be before start date',
  path: ['endDate'],
});

interface OfferFormProps {
  initialData?: SpecialOfferDto;
  onSuccess?: () => void;
}

export default function OfferForm({ initialData, onSuccess }: OfferFormProps) {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof offerFormSchema>>({
    resolver: zodResolver(offerFormSchema),
    defaultValues: {
      title: initialData?.title ?? '',
      description: initialData?.description ?? '',
      discountPercentage: initialData?.discountPercentage ?? 0,
      startDate: initialData?.startDate ? new Date(initialData.startDate) : undefined,
      endDate: initialData?.endDate ? new Date(initialData.endDate) : undefined,
      imageUrl: initialData?.imageUrl ?? '',
      isActive: initialData?.isActive ?? true,
    },
  });

  const onSubmit = async (values: z.infer<typeof offerFormSchema>): Promise<void> => {
    try {
      const offerData: SpecialOfferDto = {
        ...initialData,
        id: initialData?.id ?? '', // ID is required for DTO, but will be ignored on create
        title: values.title,
        description: values.description,
        discountPercentage: values.discountPercentage,
        startDate: format(values.startDate, 'yyyy-MM-dd'),
        endDate: format(values.endDate, 'yyyy-MM-dd'),
        imageUrl: values.imageUrl,
        isActive: values.isActive,
      };

      if (initialData?.id) {
        await updateSpecialOffer(initialData.id, offerData);
        toast.success('Special offer updated successfully!');
      } else {
        await createSpecialOffer(offerData);
        toast.success('Special offer created successfully!');
      }
      queryClient.invalidateQueries({ queryKey: ['specialOffers'] });
      onSuccess?.();
    } catch (error) {
      console.error('Failed to save special offer:', error);
      toast.error('Failed to save special offer.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="offer-form">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Summer Sale" {...field} data-testid="offer-title" />
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
                <Textarea placeholder="Get 20% off all main courses" {...field} data-testid="offer-description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discountPercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount Percentage</FormLabel>
              <FormControl>
                <Input type="number" placeholder="20" {...field} data-testid="offer-discountPercentage" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Start Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                      data-testid="offer-startDate-trigger"
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
                    selected={field.value}
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
          name="endDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                      data-testid="offer-endDate-trigger"
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
                    selected={field.value}
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
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/offer.jpg" {...field} data-testid="offer-imageUrl" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Active</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  data-testid="offer-isActive"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" data-testid="offer-submit">
          {initialData ? 'Update Offer' : 'Create Offer'}
        </Button>
      </form>
    </Form>
  );
}