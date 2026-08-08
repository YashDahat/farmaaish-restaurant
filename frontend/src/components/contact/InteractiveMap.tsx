import type { JSX } from 'react';
import React from 'react';

export default function InteractiveMap(): React.JSX.Element {
  const latitude = 18.55557;
  const longitude = 73.7749;

  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY ?? ''}&q=${latitude},${longitude}`;

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