import { SiteConfig } from '@/shell/types';

interface ContactDetailsProps {
  config: SiteConfig;
}

export default function ContactDetails({ config }: ContactDetailsProps): JSX.Element {
  const { address, phone, openingHours } = config.footer;

  return (
    <div className="space-y-4 text-center md:text-left">
      <h3 className="text-2xl font-semibold text-[#36454F]">Contact Information</h3>
      {address && (
        <p className="text-lg text-[#36454F]">
          <span className="font-medium">Address:</span> {address}
        </p>
      )}
      {phone && (
        <p className="text-lg text-[#36454F]">
          <span className="font-medium">Phone:</span>{' '}
          <a href={`tel:${phone}`} className="text-[#D4AF37] hover:underline transition-all duration-200">
            {phone}
          </a>
        </p>
      )}
      {openingHours && (
        <p className="text-lg text-[#36454F]">
          <span className="font-medium">Hours:</span> {openingHours}
        </p>
      )}
    </div>
  );
}