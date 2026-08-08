import type { JSX } from 'react';
import { GalleryImageDto } from '@/types/gallery';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';

interface GalleryGridProps {
  images: GalleryImageDto[];
  onDelete: (id: string) => void;
}

export default function GalleryGrid({ images, onDelete }: GalleryGridProps): JSX.Element {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((image) => (
        <Card key={image.id} className="overflow-hidden">
          <CardContent className="p-0">
            <img
              src={image.imageUrl}
              alt={image.caption}
              className="w-full h-48 object-cover"
            />
          </CardContent>
          <CardFooter className="flex justify-between items-center p-4">
            <p className="text-sm text-gray-700 truncate">{image.caption}</p>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onDelete(image.id)}
              data-testid={`delete-image-${image.id}`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}