import { useParams } from 'react-router-dom';
import { usePostById } from '@/hooks/useBlog';
import PostContent from '@/components/blog/PostContent';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, error } = usePostById(id || '');

  if (isLoading) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-10 w-3/4 mb-6" />
            <Skeleton className="h-4 w-1/4 mb-8" />
            <Skeleton className="h-96 w-full rounded-lg mb-10" />
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-6 w-5/6" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-red-600">
          <p>Error: {error.message}</p>
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-[#36454F]">
          <p>Blog post not found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <PostContent post={post} />
      </div>
    </section>
  );
}