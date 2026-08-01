import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BlogPostDto } from '@/types/blog';
import { ROUTES } from '@/routes';

interface BlogPostCardProps {
  post: BlogPostDto;
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  const formattedDate = post.publicationDate
    ? new Date(post.publicationDate).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A';

  const excerpt = post.content ? post.content.substring(0, 150) + '...' : '';

  return (
    <Link to={ROUTES.BLOG_POST_DETAIL.replace(':id', post.id ?? '')} data-testid="blog-post-card">
      <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-lg">
        {post.imageUrl && (
          <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
            <img
              src={post.imageUrl}
              alt={post.title ?? 'Blog Post Image'}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        )}
        <CardHeader className="flex-grow">
          <CardTitle className="text-xl font-semibold">{post.title}</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            By {post.author ?? 'Unknown Author'} on {formattedDate}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-[#36454F] leading-relaxed">{excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BlogPostCard;