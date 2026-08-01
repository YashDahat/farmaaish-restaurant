import React from 'react';
import Layout from '@/components/Layout';
import { useAllBlogPosts } from '@/hooks/useBlog';
import BlogPostGrid from '@/components/blog/BlogPostGrid';
import { Skeleton } from '@/components/ui/skeleton';

const BlogPage: React.FC = () => {
  const { data: blogPosts, isLoading, isError, error } = useAllBlogPosts();

  return (
    <Layout>
      <section className="relative h-[300px] md:h-[400px] bg-cover bg-center" style={{ backgroundImage: 'url(/images/blog-hero.webp)' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white" data-testid="blog-hero-title">
            Our Blog
          </h1>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12" data-testid="blog-section-title">
            Latest Stories & Updates
          </h2>

          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="h-full flex flex-col">
                  <Skeleton className="h-48 w-full rounded-t-xl" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {isError && (
            <div className="text-center text-red-600 text-lg" data-testid="blog-error-message">
              Error loading blog posts: {error?.message || 'Unknown error'}
            </div>
          )}

          {!isLoading && !isError && blogPosts && blogPosts.length > 0 && (
            <BlogPostGrid posts={blogPosts} />
          )}

          {!isLoading && !isError && (!blogPosts || blogPosts.length === 0) && (
            <div className="text-center text-gray-600 text-lg" data-testid="blog-empty-state">
              No blog posts found. Please check back later!
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default BlogPage;