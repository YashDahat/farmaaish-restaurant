import React from 'react';

const galleryImages: string[] = [
  '/images/ambiance-1.jpg',
  '/images/ambiance-2.jpg',
  '/images/ambiance-3.jpg',
  '/images/ambiance-4.jpg',
  '/images/ambiance-5.jpg',
  '/images/ambiance-6.jpg',
];

export default function AmbianceGallerySection(): React.JSX.Element {
  return (
    <section className="py-16 px-4 bg-white" data-testid="ambiance-gallery-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-[#36454F]">
          Our Ambiance
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((src, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
              <img
                src={src}
                alt={`Restaurant Ambiance ${index + 1}`}
                className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}