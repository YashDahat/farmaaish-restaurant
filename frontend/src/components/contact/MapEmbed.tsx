import React from 'react';

interface MapEmbedProps {
  latitude: number;
  longitude: number;
  restaurantName: string;
}

const MapEmbed: React.FC<MapEmbedProps> = ({ latitude, longitude, restaurantName }) => {
  const googleMapsUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=16&output=embed`;

  return (
    <div className="w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-lg">
      <iframe
        title={`Location of ${restaurantName}`}
        src={googleMapsUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapEmbed;