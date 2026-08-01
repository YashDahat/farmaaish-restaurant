import { GalleryImageDto } from '@/types/gallery';
import { Card, CardContent } from '@/components/ui/card';

interface ImageGridProps {
  images: GalleryImageDto[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((image) => (
        <Card key={image.id} className="overflow-hidden rounded-xl shadow-md border border-gray-100 p-0">
          <CardContent className="p-0">
            <div className="relative w-full h-60">
              <img
                src={image.imageUrl ?? 'https://via.placeholder.com/400x300?text=No+Image'}
                alt={image.caption ?? 'Gallery Image'}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                data-testid="gallery-image"
              />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-sm">
                  {image.caption}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ImageGrid;