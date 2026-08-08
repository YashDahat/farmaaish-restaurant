import React from 'react';
import siteConfig from '@/config/siteConfig';

export default function InteractiveMap(): React.JSX.Element {
  const { mapCoordinates } = siteConfig.footer;
  const { latitude, longitude } = mapCoordinates || { latitude: 0, longitude: 0 };

  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${latitude},${longitude}`;

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-[#36454F]">Find Us Here</h2>
        <div className="relative h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden shadow-lg">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={mapSrc}
            title="Farmaaish Restaurant Location"
            data-testid="interactive-map"
          ></iframe>
        </div>
      </div>
    </section>
  );
}