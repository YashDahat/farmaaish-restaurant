import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, updatePost } from '@/services/blogService';
import type { PostDto } from '@/types/blog';

const postFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  author: z.string().min(1, 'Author is required'),
  publishDate: z.string().min(1, 'Publish Date is required'),
  imageUrl: z.string().url('Must be a valid URL').min(1, 'Image URL is required'),
});

interface PostFormProps {
  post?: PostDto;
  onSuccess?: () => void;
}

export default function PostForm({ post, onSuccess }: PostFormProps) {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: post?.title ?? '',
      content: post?.content ?? '',
      author: post?.author ?? '',
      publishDate: post?.publishDate ? new Date(post.publishDate).toISOString().split('T')[0] : '',
      imageUrl: post?.imageUrl ?? '',
    },
  });

  useEffect(() => {
    if (post) {
      form.reset({
        title: post.title,
        content: post.content,
        author: post.author,
        publishDate: new Date(post.publishDate).toISOString().split('T')[0],
        imageUrl: post.imageUrl,
      });
    }
  }, [post, form]);

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast.success('Post created successfully!');
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(`Failed to create post: ${error.message}`);
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: ({ id, request }: { id: string; request: PostDto }) => updatePost(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast.success('Post updated successfully!');
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(`Failed to update post: ${error.message}`);
    },
  });

  const onSubmit = (values: z.infer<typeof postFormSchema>): void => {
    const postData: PostDto = {
      id: post?.id ?? '', // ID is required for DTO but will be ignored on create
      title: values.title,
      content: values.content,
      author: values.author,
      publishDate: values.publishDate,
      imageUrl: values.imageUrl,
    };

    if (post) {
      updatePostMutation.mutate({ id: post.id, request: postData });
    } else {
      createPostMutation.mutate(postData);
    }
  };

  const isPending = createPostMutation.isPending || updatePostMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" data-testid="post-form">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Post Title" {...field} data-testid="post-title" />
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
                <Textarea placeholder="Post Content" {...field} rows={8} data-testid="post-content" />
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
                <Input placeholder="Author Name" {...field} data-testid="post-author" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="publishDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publish Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} data-testid="post-publishDate" />
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
                <Input placeholder="https://example.com/image.jpg" {...field} data-testid="post-imageUrl" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} data-testid="post-submit">
          {isPending ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
        </Button>
      </form>
    </Form>
  );
}