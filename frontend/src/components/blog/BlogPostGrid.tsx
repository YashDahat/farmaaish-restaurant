import { BlogPostDto } from '@/types/blog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';

interface BlogPostGridProps {
  posts: BlogPostDto[];
}

const BlogPostGrid: React.FC<BlogPostGridProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Link to={ROUTES.BLOG_POST_DETAIL.replace(':id', post.id ?? '')} key={post.id} data-testid="blog-post-card">
          <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-lg hover:border-gray-300">
            {post.imageUrl && (
              <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                <img
                  src={post.imageUrl}
                  alt={post.title ?? 'Blog post image'}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl font-semibold">{post.title}</CardTitle>
              <p className="text-sm text-gray-600">
                By {post.author ?? 'Unknown Author'} on{' '}
                {post.publicationDate
                  ? new Date(post.publicationDate).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'N/A'}
              </p>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-[#36454F] leading-relaxed">
                {post.content ? `${post.content.substring(0, 150)}...` : 'No content available.'}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default BlogPostGrid;