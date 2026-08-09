import { GalleryImageDto } from '@/types/gallery';
import { Card, CardContent } from '@/components/ui/card';

interface ImageGridProps {
  images: GalleryImageDto[];
}

export default function ImageGrid({ images }: ImageGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((image) => (
        <Card key={image.id} className="overflow-hidden rounded-lg shadow-md">
          <CardContent className="p-0">
            <img
              src={image.imageUrl}
              alt={image.caption}
              className="w-full h-60 object-cover transition-transform duration-200 hover:scale-105"
            />
            <div className="p-4">
              <p className="text-sm text-gray-700">{image.caption}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}