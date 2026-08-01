import { BlogPostDto } from '@/types/blog';

interface BlogPostContentProps {
  post: BlogPostDto;
}

const BlogPostContent: React.FC<BlogPostContentProps> = ({ post }) => {
  const formattedDate = post.publicationDate
    ? new Date(post.publicationDate).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A';

  return (
    <div className="space-y-8">
      {post.imageUrl && (
        <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-lg">
          <img
            src={post.imageUrl}
            alt={post.title ?? 'Blog Post Image'}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {!post.imageUrl && (
          <h1 className="text-4xl md:text-5xl font-bold text-[#36454F] mb-6">{post.title}</h1>
        )}
        <div className="flex items-center text-gray-600 text-sm mb-8">
          <span className="mr-4">By {post.author ?? 'Unknown Author'}</span>
          <span>Published on {formattedDate}</span>
        </div>

        <div
          className="prose prose-lg max-w-none text-[#36454F] leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content ?? '' }}
        />
      </div>
    </div>
  );
};

export default BlogPostContent;