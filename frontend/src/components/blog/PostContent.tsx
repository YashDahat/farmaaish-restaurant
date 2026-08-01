import React from 'react';
import { PostDto } from '@/types/blog';

interface PostContentProps {
  post: PostDto;
}

const PostContent: React.FC<PostContentProps> = ({ post }) => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl md:text-4xl font-bold text-[#36454F] mb-4">
          {post.title ?? 'Untitled Post'}
        </h1>
        <div className="text-gray-600 text-sm mb-4">
          By {post.author ?? 'Unknown Author'} on {new Date(post.publishedAt ?? '').toLocaleDateString()}
        </div>
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title ?? 'Blog Post Image'}
            className="w-full h-64 object-cover rounded-md mb-6"
          />
        )}
        <div className="prose max-w-none text-[#36454F] leading-relaxed">
          <p>{post.content ?? 'No content available.'}</p>
        </div>
      </div>
    </section>
  );
};

export default PostContent;