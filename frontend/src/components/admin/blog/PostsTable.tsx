import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAllPosts } from '@/hooks/useBlog';
import { deletePost } from '@/services/blogService';
import { PostDto } from '@/types/blog';
import PostForm from './PostForm';
import { Skeleton } from '@/components/ui/skeleton';

export default function PostsTable(): React.JSX.Element {
  const { data: posts, isLoading, error } = useAllPosts();
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingPost, setEditingPost] = useState<PostDto | null>(null);

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast.success('Post deleted successfully.');
    },
    onError: (err) => {
      toast.error(`Failed to delete post: ${err.message}`);
    },
  });

  const handleDelete = (id: string): void => {
    deleteMutation.mutate(id);
  };

  const handleEdit = (post: PostDto): void => {
    setEditingPost(post);
    setIsFormOpen(true);
  };

  const handleCreate = (): void => {
    setEditingPost(null);
    setIsFormOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading posts: {error.message}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate} data-testid="create-post-button">Create New Post</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</DialogTitle>
            </DialogHeader>
            <PostForm
              initialData={editingPost}
              onSuccess={() => {
                setIsFormOpen(false);
                setEditingPost(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {posts && posts.length > 0 ? (
        <Table data-testid="posts-table">
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Publish Date</TableHead>
              <TableHead>Image URL</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id} data-testid={`post-row-${post.id}`}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>{new Date(post.publishDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <a href={post.imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    View Image
                  </a>
                </TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(post)} data-testid={`edit-post-button-${post.id}`}>
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[800px]">
                      <DialogHeader>
                        <DialogTitle>Edit Post</DialogTitle>
                      </DialogHeader>
                      <PostForm
                        initialData={post}
                        onSuccess={() => {
                          setIsFormOpen(false);
                          setEditingPost(null);
                        }}
                      />
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(post.id)}
                    disabled={deleteMutation.isPending}
                    data-testid={`delete-post-button-${post.id}`}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8 text-gray-500">No blog posts found.</div>
      )}
    </div>
  );
}