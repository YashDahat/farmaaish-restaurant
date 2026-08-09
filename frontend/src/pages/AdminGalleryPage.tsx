import AdminLayout from '@/components/AdminLayout';
import GalleryGrid from '@/components/admin/gallery/GalleryGrid';
import ImageUploadForm from '@/components/admin/gallery/ImageUploadForm';
import { Separator } from '@/components/ui/separator';

export default function AdminGalleryPage() {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-8 p-6">
        <h1 className="text-3xl font-bold">Manage Gallery Images</h1>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Upload New Image</h2>
          <ImageUploadForm />
        </section>

        <Separator />

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Existing Images</h2>
          <GalleryGrid />
        </section>
      </div>
    </AdminLayout>
  );
}