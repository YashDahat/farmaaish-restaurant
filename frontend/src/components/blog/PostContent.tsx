import { PostDto } from '@/types/blog';

interface PostContentProps {
  post: PostDto;
}

export default function PostContent({ post }: PostContentProps) {
  const formattedDate = new Date(post.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-[#36454F] mb-6 leading-tight">
        {post.title}
      </h1>
      <div className="flex items-center text-gray-600 text-sm mb-8">
        <p className="mr-4">By {post.author}</p>
        <p>{formattedDate}</p>
      </div>
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-96 object-cover rounded-lg mb-10 shadow-lg"
      />
      <div
        className="prose prose-lg max-w-none text-[#36454F] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}