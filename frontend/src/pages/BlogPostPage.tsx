import React from 'react';
import { useParams } from 'react-router-dom';
import { usePost } from '@/hooks/useBlog';
import Layout from '@/components/Layout';
import PostContent from '@/components/blog/PostContent';
import { Skeleton } from '@/components/ui/skeleton';

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, isError, error } = usePost(id || '');

  if (isLoading) {
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-64 w-full rounded-md mb-6" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-5/6" />
          </div>
        </section>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 text-red-600">
            Error loading post: {error?.message || 'Unknown error'}
          </div>
        </section>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 text-gray-600">
            Post not found.
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <PostContent post={post} />
    </Layout>
  );
};

export default BlogPostPage;