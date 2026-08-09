import PostCard from '@/components/blog/PostCard';
import { useAllPosts } from '@/hooks/useBlog';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPage() {
  const { data: posts, isLoading, error } = useAllPosts();

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-[#36454F] mb-12 text-center">Our Blog</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="h-[400px] w-full rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center text-red-600">
          <h1 className="text-4xl md:text-5xl font-bold text-[#36454F] mb-12">Error</h1>
          <p>Failed to load blog posts. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-[#36454F] mb-12 text-center">Our Blog</h1>
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center text-[#36454F]">
            <p className="text-lg">No blog posts found.</p>
          </div>
        )}
      </div>
    </section>
  );
}