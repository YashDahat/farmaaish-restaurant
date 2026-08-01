import { PostDto } from '@/types/blog';
import { PostCard } from './PostCard';

interface PostListProps {
  posts: PostDto[];
}

export const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="post-list">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};