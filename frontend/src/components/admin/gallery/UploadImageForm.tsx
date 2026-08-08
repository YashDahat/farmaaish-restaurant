'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function UploadImageForm({
  onUpload,
  isLoading,
}: {
  onUpload: (file: File, caption: string) => void;
  isLoading: boolean;
}): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (file && caption) {
      onUpload(file, caption);
      setFile(null);
      setCaption('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md shadow-sm bg-white">
      <div>
        <Label htmlFor="imageFile">Image File</Label>
        <Input
          id="imageFile"
          type="file"
          accept="image/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files ? e.target.files[0] : null)}
          data-testid="gallery-image-file"
        />
      </div>
      <div>
        <Label htmlFor="caption">Caption</Label>
        <Input
          id="caption"
          type="text"
          value={caption}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCaption(e.target.value)}
          placeholder="Enter image caption"
          data-testid="gallery-image-caption"
        />
      </div>
      <Button
        type="submit"
        disabled={!file || !caption || isLoading}
        className="bg-[#D4AF37] hover:bg-[#C2A032] text-[#36454F] font-medium rounded-md px-4 py-2"
        data-testid="gallery-upload-submit"
      >
        {isLoading ? 'Uploading...' : 'Upload Image'}
      </Button>
    </form>
  );
}