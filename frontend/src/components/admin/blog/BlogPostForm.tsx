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
import type { BlogPostDto } from '@/types/blog';
import { useCreateBlogPost, useUpdateBlogPost } from '@/hooks/useBlog';
import { toast } from 'sonner';

const blogPostFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  author: z.string().min(1, 'Author is required'),
  publicationDate: z.string().min(1, 'Publication Date is required'),
  imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
});

type BlogPostFormValues = z.infer<typeof blogPostFormSchema>;

interface BlogPostFormProps {
  initialData?: BlogPostDto;
  onSubmit: () => void;
}

export function BlogPostForm({ initialData, onSubmit }: BlogPostFormProps) {
  const createMutation = useCreateBlogPost();
  const updateMutation = useUpdateBlogPost(initialData?.id || '');

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostFormSchema),
    defaultValues: {
      title: initialData?.title ?? '',
      content: initialData?.content ?? '',
      author: initialData?.author ?? '',
      publicationDate: initialData?.publicationDate ?? '',
      imageUrl: initialData?.imageUrl ?? '',
    },
  });

  const handleSubmit = async (values: BlogPostFormValues) => {
    try {
      if (initialData?.id) {
        await updateMutation.mutateAsync({ ...values, id: initialData.id, imageUrl: values.imageUrl ?? null });
        toast.success('Blog post updated successfully!');
      } else {
        await createMutation.mutateAsync({ ...values, id: null, imageUrl: values.imageUrl ?? null });
        toast.success('Blog post created successfully!');
      }
      onSubmit();
    } catch (error) {
      toast.error('Failed to save blog post.');
      console.error('Failed to save blog post:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4" data-testid="blog-post-form">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Blog post title" {...field} data-testid="blog-post-title" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Blog post content" rows={8} {...field} data-testid="blog-post-content" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Author name" {...field} data-testid="blog-post-author" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="publicationDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publication Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} data-testid="blog-post-publication-date" />
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
                <Input placeholder="https://example.com/image.jpg" {...field} data-testid="blog-post-image-url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-md px-6 py-2 transition-all duration-200" data-testid="blog-post-submit">
          {initialData?.id ? 'Update Blog Post' : 'Create Blog Post'}
        </Button>
      </form>
    </Form>
  );
}