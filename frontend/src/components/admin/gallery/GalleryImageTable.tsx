import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { GalleryImageDto } from '@/types/gallery';

interface GalleryImageTableProps {
  galleryImages: GalleryImageDto[];
  onEdit: (image: GalleryImageDto) => void;
  onDelete: (imageId: string) => void;
}

const GalleryImageTable: React.FC<GalleryImageTableProps> = ({ galleryImages, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <Table data-testid="gallery-image-table">
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Caption</TableHead>
            <TableHead>Display Order</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {galleryImages.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                No gallery images found.
              </TableCell>
            </TableRow>
          ) : (
            galleryImages.map((image) => (
              <TableRow key={image.id} data-testid="gallery-image-card">
                <TableCell>
                  {image.imageUrl && (
                    <img src={image.imageUrl} alt={image.caption ?? "Gallery Image"} className="w-20 h-20 object-cover rounded-md" />
                  )}
                </TableCell>
                <TableCell>{image.caption}</TableCell>
                <TableCell>{image.displayOrder}</TableCell>
                <TableCell className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(image)}
                    data-testid={`edit-gallery-image-${image.id}`}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => image.id && onDelete(image.id)}
                    data-testid={`delete-gallery-image-${image.id}`}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default GalleryImageTable;