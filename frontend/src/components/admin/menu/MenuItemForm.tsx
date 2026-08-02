import { useEffect } from 'react';
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
import { MenuItemDto } from '@/types/menu';
import { useMenu } from '@/hooks/useMenu';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMenuItem, updateMenuItem } from '@/services/menuService';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  description: z.string().optional(),
  price: z.coerce.number().min(0.01, { message: 'Price must be a positive number.' }),
  imageUrl: z.string().url({ message: 'Invalid URL for image.' }).optional().or(z.literal('')),
  vegetarian: z.boolean(),
  spicy: z.boolean(),
  categoryId: z.string().min(1, { message: 'Category is required.' }),
});

type MenuItemFormValues = z.infer<typeof formSchema>;

interface MenuItemFormProps {
  initialData?: MenuItemDto;
  onSuccess?: () => void;
}

export default function MenuItemForm({ initialData, onSuccess }: MenuItemFormProps) {
  const queryClient = useQueryClient();
  const { menuCategories, isLoading: isLoadingCategories } = useMenu();

  const form = useForm<MenuItemFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      price: initialData?.price ?? 0,
      imageUrl: initialData?.imageUrl ?? '',
      vegetarian: initialData?.vegetarian ?? false,
      spicy: initialData?.spicy ?? false,
      categoryId: initialData?.categoryId ?? '',
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name ?? '',
        description: initialData.description ?? '',
        price: initialData.price ?? 0,
        imageUrl: initialData.imageUrl ?? '',
        vegetarian: initialData.vegetarian ?? false,
        spicy: initialData.spicy ?? false,
        categoryId: initialData.categoryId ?? '',
      });
    }
  }, [initialData, form]);

  const createMutation = useMutation({
    mutationFn: createMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      queryClient.invalidateQueries({ queryKey: ['menuCategories'] });
      toast.success('Menu item created successfully.');
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(`Failed to create menu item: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: MenuItemDto }) => updateMenuItem(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      queryClient.invalidateQueries({ queryKey: ['menuCategories'] });
      toast.success('Menu item updated successfully.');
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(`Failed to update menu item: ${error.message}`);
    },
  });

  const onSubmit = (values: MenuItemFormValues) => {
    const menuItemDto: MenuItemDto = {
      id: initialData?.id ?? null,
      name: values.name,
      description: values.description ?? null,
      price: values.price,
      imageUrl: values.imageUrl ?? null,
      vegetarian: values.vegetarian,
      spicy: values.spicy,
      categoryId: values.categoryId,
      categoryName: menuCategories.find(cat => cat.id === values.categoryId)?.name ?? null,
    };

    if (initialData?.id) {
      updateMutation.mutate({ id: initialData.id, data: menuItemDto });
    } else {
      createMutation.mutate(menuItemDto);
    }
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="menu-item-form">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Menu Item Name" {...field} data-testid="menu-item-name" />
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
                <Textarea placeholder="Description" {...field} data-testid="menu-item-description" />
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
                <Input type="number" step="0.01" placeholder="0.00" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} data-testid="menu-item-price" />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="menu-item-category-select">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {isLoadingCategories ? (
                    <SelectItem value="loading" disabled>Loading categories...</SelectItem>
                  ) : (
                    menuCategories
                      .filter(category => category.id !== 'all') // Exclude 'All' category from form
                      .map((category) => (
                        <SelectItem key={category.id} value={category.id} data-testid={`menu-item-category-option-${category.id}`}>
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
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
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
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
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
        </div>
        <Button type="submit" disabled={isSubmitting} data-testid="menu-item-submit">
          {isSubmitting ? 'Saving...' : initialData ? 'Update Item' : 'Create Item'}
        </Button>
      </form>
    </Form>
  );
}