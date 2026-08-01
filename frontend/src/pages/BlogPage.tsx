import { Layout } from '@/components/Layout';
import { PostList } from '@/components/blog/PostList';
import { useAllPosts } from '@/hooks/useBlog';
import { Skeleton } from '@/components/ui/skeleton';

const BlogPage = () => {
  const { data: posts, isLoading, isError, error } = useAllPosts();

  if (isLoading) {
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-semibold text-center mb-8">Our Blog</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="flex flex-col space-y-3">
                  <Skeleton className="h-[200px] w-full rounded-t-xl" />
                  <div className="p-6 space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl md:text-3xl font-semibold mb-4">Error</h1>
            <p className="text-red-500">Failed to load blog posts: {error?.message}</p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-semibold text-center mb-8">Our Blog</h1>
          {posts && posts.length > 0 ? (
            <PostList posts={posts} />
          ) : (
            <div className="text-center text-gray-600">No blog posts found.</div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;