import siteConfig from '@/config/siteConfig';

export default function LocationMap() {
  return (
    <section className="py-16 px-4 bg-white" data-testid="location-map-section">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-[#36454F]">Find Us Here</h2>
        <div className="aspect-w-16 aspect-h-9 w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={siteConfig.googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Farmaaish Restaurant Location"
            data-testid="google-maps-iframe"
          ></iframe>
        </div>
      </div>
    </section>
  );
}