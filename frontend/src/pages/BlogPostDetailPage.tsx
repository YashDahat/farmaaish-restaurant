import React from 'react';
import { useParams } from 'react-router-dom';
import { useBlogPost } from '@/hooks/useBlog';
import Layout from '@/components/Layout';
import BlogPostContent from '@/components/blog/BlogPostContent';
import { Skeleton } from '@/components/ui/skeleton';

const BlogPostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: blogPost, isLoading, isError, error } = useBlogPost(id ?? '');

  if (isLoading) {
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <Skeleton className="h-[400px] w-full rounded-lg mb-8" />
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/4 mb-8" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </section>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center text-red-600">
            <h2 className="text-2xl font-semibold">Error loading blog post</h2>
            <p>{error?.message || 'An unexpected error occurred.'}</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (!blogPost) {
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto text-center text-gray-700">
            <h2 className="text-2xl font-semibold">Blog post not found</h2>
            <p>The blog post you are looking for does not exist or has been removed.</p>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <BlogPostContent post={blogPost} />
        </div>
      </section>
    </Layout>
  );
};

export default BlogPostDetailPage;