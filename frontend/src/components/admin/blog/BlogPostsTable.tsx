import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { BlogPostDto } from '@/types/blog';
import { PencilIcon, Trash2Icon } from 'lucide-react';

interface BlogPostsTableProps {
  blogPosts: BlogPostDto[];
  onEdit: (blogPost: BlogPostDto) => void;
  onDelete: (id: string) => void;
}

export function BlogPostsTable({ blogPosts, onEdit, onDelete }: BlogPostsTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table data-testid="blog-posts-table">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Publication Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blogPosts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No blog posts found.
              </TableCell>
            </TableRow>
          ) : (
            blogPosts.map((post) => (
              <TableRow key={post.id} data-testid={`blog-post-row-${post.id}`}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>{post.publicationDate}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(post)}
                      data-testid={`edit-blog-post-${post.id}`}
                    >
                      <PencilIcon className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => post.id && onDelete(post.id)}
                      data-testid={`delete-blog-post-${post.id}`}
                    >
                      <Trash2Icon className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}