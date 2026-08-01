import { useState } from 'react';
import { AdminLayout } from '@/components/AdminLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BlogPostDto } from '@/types/blog';
import { useAdminAllBlogPosts, useDeleteBlogPost } from '@/hooks/useBlog';
import { BlogPostsTable } from '@/components/admin/blog/BlogPostsTable';
import { BlogPostForm } from '@/components/admin/blog/BlogPostForm';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { PlusCircleIcon } from 'lucide-react';

export default function AdminBlogPage() {
  const { data: blogPosts, isLoading, error, refetch } = useAdminAllBlogPosts();
  const deleteMutation = useDeleteBlogPost();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBlogPost, setEditingBlogPost] = useState<BlogPostDto | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [blogPostToDelete, setBlogPostToDelete] = useState<string | null>(null);

  const handleCreateNew = () => {
    setEditingBlogPost(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (blogPost: BlogPostDto) => {
    setEditingBlogPost(blogPost);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setBlogPostToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (blogPostToDelete) {
      try {
        await deleteMutation.queryFn(blogPostToDelete);
        toast.success('Blog post deleted successfully!');
        refetch();
      } catch (error) {
        toast.error('Failed to delete blog post.');
        console.error('Failed to delete blog post:', error);
      } finally {
        setIsDeleteDialogOpen(false);
        setBlogPostToDelete(null);
      }
    }
  };

  const handleFormSubmit = () => {
    setIsFormOpen(false);
    setEditingBlogPost(undefined);
    refetch();
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold text-[#36454F] mb-6">Manage Blog Posts</h1>
          <div>Loading blog posts...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold text-[#36454F] mb-6">Manage Blog Posts</h1>
          <div>Error loading blog posts: {error.message}</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#36454F]" data-testid="admin-blog-title">Manage Blog Posts</h1>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={handleCreateNew}
                  className="bg-[#D4AF37] hover:bg-[#b89a2f] text-white font-semibold rounded-md px-6 py-2 transition-all duration-200"
                  data-testid="create-blog-post-cta"
                >
                  <PlusCircleIcon className="h-5 w-5 mr-2" />
                  Create New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                  <DialogTitle>{editingBlogPost ? 'Edit Blog Post' : 'Create Blog Post'}</DialogTitle>
                </DialogHeader>
                <BlogPostForm initialData={editingBlogPost} onSubmit={handleFormSubmit} />
              </DialogContent>
            </Dialog>
          </div>

          <BlogPostsTable blogPosts={blogPosts || []} onEdit={handleEdit} onDelete={handleDelete} />

          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the blog post.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel data-testid="delete-blog-post-cancel">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600" data-testid="delete-blog-post-confirm">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>
    </AdminLayout>
  );
}