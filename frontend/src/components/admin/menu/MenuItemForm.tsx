import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { createMenuItem, updateMenuItem } from '@/services/menuService';
import { MenuItemDto } from '@/types/menu';
import { useMenu } from '@/hooks/useMenu';

interface MenuItemFormProps {
  initialData?: MenuItemDto;
  onSuccess?: () => void;
}

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0'),
  imageUrl: z.string().url('Invalid URL').min(1, 'Image URL is required'),
  isVegetarian: z.boolean(),
  isAvailable: z.boolean(),
  categoryId: z.string().min(1, 'Category is required'),
});

export default function MenuItemForm({ initialData, onSuccess }: MenuItemFormProps): React.JSX.Element {
  const queryClient = useQueryClient();
  const { categories, categoriesLoading } = useMenu();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      price: initialData?.price ?? 0,
      imageUrl: initialData?.imageUrl ?? '',
      isVegetarian: initialData?.isVegetarian ?? false,
      isAvailable: initialData?.isAvailable ?? true,
      categoryId: initialData?.categoryId ?? '',
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        description: initialData.description,
        price: initialData.price,
        imageUrl: initialData.imageUrl,
        isVegetarian: initialData.isVegetarian,
        isAvailable: initialData.isAvailable,
        categoryId: initialData.categoryId,
      });
    }
  }, [initialData, form]);

  const createMutation = useMutation({
    mutationFn: createMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
      queryClient.invalidateQueries({ queryKey: ['menuCategories'] });
      toast.success('Menu item created successfully.');
      form.reset();
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(`Failed to create menu item: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, request }: { id: string; request: MenuItemDto }) => updateMenuItem(id, request),
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

  const onSubmit = (values: z.infer<typeof formSchema>): void => {
    const menuItemRequest: MenuItemDto = {
      id: initialData?.id ?? '', // ID is not used for creation, but required by DTO
      name: values.name,
      description: values.description,
      price: values.price,
      imageUrl: values.imageUrl,
      isVegetarian: values.isVegetarian,
      isAvailable: values.isAvailable,
      categoryId: values.categoryId,
      categoryName: categories?.find(cat => cat.id === values.categoryId)?.name ?? '', // categoryName is derived
    };

    if (initialData) {
      updateMutation.mutate({ id: initialData.id, request: menuItemRequest });
    } else {
      createMutation.mutate(menuItemRequest);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

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
                <Textarea placeholder="Description of the menu item" {...field} data-testid="menu-item-description" />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="menu-item-category-select">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categoriesLoading ? (
                    <SelectItem value="loading" disabled>Loading categories...</SelectItem>
                  ) : (
                    categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
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
        <FormField
          control={form.control}
          name="isVegetarian"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  data-testid="menu-item-is-vegetarian"
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
          name="isAvailable"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  data-testid="menu-item-is-available"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Available</FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} data-testid="menu-item-submit">
          {isPending ? 'Saving...' : initialData ? 'Update Item' : 'Create Item'}
        </Button>
      </form>
    </Form>
  );
}