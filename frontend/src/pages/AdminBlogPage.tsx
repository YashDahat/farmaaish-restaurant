import type { JSX } from 'react';
import AdminLayout from '@/components/AdminLayout';
import PostsTable from '@/components/admin/blog/PostsTable';

export default function AdminBlogPage(): React.JSX.Element {
  return (
    <AdminLayout>
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Blog Posts</h1>
          <PostsTable />
        </div>
      </section>
    </AdminLayout>
  );
}