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
import type { GalleryImageDto } from '@/types/gallery';

const formSchema = z.object({
  imageUrl: z.string().url({ message: 'Please enter a valid URL.' }),
  caption: z.string().min(1, { message: 'Caption is required.' }),
  displayOrder: z.coerce.number().min(0, { message: 'Display order must be a positive number.' }),
});

interface GalleryImageFormProps {
  initialData?: GalleryImageDto;
  onSubmit: (data: GalleryImageDto) => void;
}

export const GalleryImageForm = ({ initialData, onSubmit }: GalleryImageFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: initialData?.imageUrl ?? '',
      caption: initialData?.caption ?? '',
      displayOrder: initialData?.displayOrder ?? 0,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      ...initialData,
      imageUrl: values.imageUrl,
      caption: values.caption,
      displayOrder: values.displayOrder,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4" data-testid="gallery-image-form">
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} data-testid="gallery-image-imageUrl" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caption</FormLabel>
              <FormControl>
                <Input placeholder="Delicious dish" {...field} data-testid="gallery-image-caption" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="displayOrder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Order</FormLabel>
              <FormControl>
                <Input type="number" {...field} data-testid="gallery-image-displayOrder" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-md px-6 py-2 transition-all duration-200" data-testid="gallery-image-submit">
          {initialData ? 'Save Changes' : 'Create Image'}
        </Button>
      </form>
    </Form>
  );
};