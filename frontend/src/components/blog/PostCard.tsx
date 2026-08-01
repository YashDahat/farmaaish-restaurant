import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PostDto } from '@/types/blog';
import { ROUTES } from '@/routes';
import { Button } from '@/components/ui/button';

interface PostCardProps {
  post: PostDto;
}

const PostCard = ({ post }: PostCardProps) => {
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A';

  const truncatedContent = post.content
    ? post.content.substring(0, 150) + (post.content.length > 150 ? '...' : '')
    : '';

  return (
    <Card className="overflow-hidden rounded-xl shadow-md border border-gray-100 transition-all duration-200 hover:shadow-lg" data-testid="blog-post-card">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title ?? 'Blog post image'}
          className="w-full h-48 object-cover"
        />
      )}
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{post.title}</CardTitle>
        <CardDescription className="text-sm text-gray-600">
          By {post.author ?? 'Unknown'} on {formattedDate}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-[#36454F] leading-relaxed">{truncatedContent}</p>
        <Link to={`${ROUTES.BLOG_POST}?id=${post.id}`} className="block">
          <Button
            className="bg-[#D4AF37] hover:bg-[#b8942b] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200"
            data-testid="read-more-cta"
          >
            Read More
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default PostCard;