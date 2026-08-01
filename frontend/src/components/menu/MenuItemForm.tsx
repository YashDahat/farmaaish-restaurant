import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAllMenuItemCategories } from '@/hooks/useMenu';
import type { CreateMenuItemRequest, MenuItemDto } from '@/types/menu';

interface MenuItemFormProps {
  initialData?: MenuItemDto;
  onSubmit: (data: CreateMenuItemRequest) => void;
  onCancel: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0'),
  imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  vegetarian: z.boolean().default(false),
  spicy: z.boolean().default(false),
  available: z.boolean().default(true),
  categoryId: z.string().min(1, 'Category is required'),
});

export function MenuItemForm({ initialData, onSubmit, onCancel }: MenuItemFormProps) {
  const { categories, isLoading: isLoadingCategories } = useAllMenuItemCategories();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      price: initialData?.price ?? 0,
      imageUrl: initialData?.imageUrl ?? '',
      vegetarian: initialData?.vegetarian ?? false,
      spicy: initialData?.spicy ?? false,
      available: initialData?.available ?? true,
      categoryId: initialData?.categoryId ?? '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      ...values,
      imageUrl: values.imageUrl === '' ? null : values.imageUrl,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Menu item name" {...field} data-testid="menu-item-name" />
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
                <Textarea placeholder="Menu item description" {...field} data-testid="menu-item-description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0.00" {...field} data-testid="menu-item-price" />
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
                <Input placeholder="https://example.com/image.jpg" {...field} data-testid="menu-item-image-url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value} data-testid="menu-item-category">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isLoadingCategories ? (
                    <SelectItem value="loading" disabled>
                      Loading categories...
                    </SelectItem>
                  ) : (
                    categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id ?? ''}>
                        {category.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center space-x-4">
          <FormField
            control={form.control}
            name="vegetarian"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    data-testid="menu-item-vegetarian"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Vegetarian</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="spicy"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    data-testid="menu-item-spicy"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Spicy</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="available"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    data-testid="menu-item-available"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Available</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel} data-testid="menu-item-cancel-button">
            Cancel
          </Button>
          <Button type="submit" className="bg-[#D4AF37] hover:bg-[#b89a2e] text-white" data-testid="menu-item-submit-button">
            {initialData ? 'Save Changes' : 'Create Item'}
          </Button>
        </div>
      </form>
    </Form>
  );
}