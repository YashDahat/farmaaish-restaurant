import { GalleryItemDto } from '@/types/gallery';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface GalleryGridProps {
  items: GalleryItemDto[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden transition-all duration-200 hover:shadow-lg">
          <div className="relative w-full h-60 overflow-hidden">
            <img
              src={item.imageUrl ?? '/placeholder-image.jpg'}
              alt={item.title ?? 'Gallery item'}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
            <CardDescription className="text-gray-600">{item.category}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}