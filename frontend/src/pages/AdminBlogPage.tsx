import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAllPosts } from '@/hooks/useBlog';
import { PostDto } from '@/types/blog';
import { createPost, updatePost, deletePost } from '@/services/blogService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Skeleton } from '@/components/ui/skeleton';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  author: z.string().min(1, 'Author is required'),
  imageUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
});

type PostFormValues = z.infer<typeof postSchema>;

const PostForm = ({ initialData, onSubmit, onCancel }: { initialData?: PostDto; onSubmit: (data: PostFormValues) => void; onCancel: () => void }) => {
  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initialData?.title ?? '',
      content: initialData?.content ?? '',
      author: initialData?.author ?? '',
      imageUrl: initialData?.imageUrl ?? '',
    },
  });

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
                <Input placeholder="Post Title" {...field} data-testid="blog-post-title" />
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
                <Textarea placeholder="Post Content" {...field} data-testid="blog-post-content" />
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
                <Input placeholder="Author Name" {...field} data-testid="blog-post-author" />
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
                <Input placeholder="Image URL" {...field} data-testid="blog-post-image-url" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" className="bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold" data-testid="blog-post-submit">
            {initialData ? 'Save Changes' : 'Create Post'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

const DeletePostDialog = ({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: () => void }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the blog post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-[#800020] hover:bg-[#66001a] text-white font-semibold">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const AdminBlogPage = () => {
  const { data: posts, isLoading, error } = useAllPosts();
  const queryClient = useQueryClient();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<PostDto | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast.success('Blog post created successfully!');
      setIsFormOpen(false);
    },
    onError: (err) => {
      toast.error(`Failed to create post: ${err.message}`);
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: ({ id, request }: { id: string; request: PostDto }) => updatePost(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast.success('Blog post updated successfully!');
      setIsFormOpen(false);
      setEditingPost(undefined);
    },
    onError: (err) => {
      toast.error(`Failed to update post: ${err.message}`);
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast.success('Blog post deleted successfully!');
      setIsDeleteDialogOpen(false);
      setPostToDelete(null);
    },
    onError: (err) => {
      toast.error(`Failed to delete post: ${err.message}`);
    },
  });

  const handleCreateNewPost = () => {
    setEditingPost(undefined);
    setIsFormOpen(true);
  };

  const handleEditPost = (post: PostDto) => {
    setEditingPost(post);
    setIsFormOpen(true);
  };

  const handleDeletePost = (id: string | null) => {
    if (id) {
      setPostToDelete(id);
      setIsDeleteDialogOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (postToDelete) {
      deletePostMutation.mutate(postToDelete);
    }
  };

  const handleFormSubmit = (data: PostFormValues) => {
    const postData: PostDto = {
      id: editingPost?.id ?? null,
      title: data.title,
      content: data.content,
      author: data.author,
      imageUrl: data.imageUrl || null,
      publishedAt: editingPost?.publishedAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editingPost?.id) {
      updatePostMutation.mutate({ id: editingPost.id, request: postData });
    } else {
      createPostMutation.mutate(postData);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-semibold mb-6">Manage Blog Posts</h1>
            <Skeleton className="h-10 w-40 mb-4" />
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </section>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <section className="py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-semibold mb-6">Manage Blog Posts</h1>
            <p className="text-red-500">Error loading blog posts: {error.message}</p>
          </div>
        </section>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold mb-6">Manage Blog Posts</h1>

          <div className="flex justify-end mb-4">
            <Button onClick={handleCreateNewPost} className="bg-[#D4AF37] hover:bg-[#b89a2e] text-white font-semibold" data-testid="create-post-cta">
              Create New Post
            </Button>
          </div>

          {posts && posts.length > 0 ? (
            <div className="overflow-x-auto rounded-md border">
              <Table data-testid="blog-posts-table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Published At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id} data-testid={`blog-post-row-${post.id}`}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'N/A'}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditPost(post)}
                          className="mr-2"
                          data-testid={`edit-post-button-${post.id}`}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeletePost(post.id)}
                          data-testid={`delete-post-button-${post.id}`}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No blog posts found.</p>
            </div>
          )}

          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}</DialogTitle>
              </DialogHeader>
              <PostForm
                initialData={editingPost}
                onSubmit={handleFormSubmit}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingPost(undefined);
                }}
              />
            </DialogContent>
          </Dialog>

          <DeletePostDialog
            isOpen={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            onConfirm={handleConfirmDelete}
          />
        </div>
      </section>
    </AdminLayout>
  );
};

export default AdminBlogPage;