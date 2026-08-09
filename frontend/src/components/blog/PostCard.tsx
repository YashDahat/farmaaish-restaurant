import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PostDto } from '@/types/blog';
import { ROUTES } from '@/routes';

interface PostCardProps {
  post: PostDto;
}

export default function PostCard({ post }: PostCardProps): React.JSX.Element {
  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Card className="flex flex-col overflow-hidden rounded-xl shadow-md border border-gray-100 transition-all duration-200 hover:shadow-lg">
      <Link to={ROUTES.BLOG_DETAIL.replace(':id', post.id)} data-testid={`blog-post-card-${post.id}`}>
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-[#36454F]">{post.title}</CardTitle>
          <CardDescription className="text-sm text-gray-500">
            By {post.author} on {formattedDate}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-[#36454F] line-clamp-3">{post.content}</p>
        </CardContent>
        <CardFooter>
          <span className="text-[#D4AF37] hover:underline font-medium">Read More</span>
        </CardFooter>
      </Link>
    </Card>
  );
}