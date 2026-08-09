import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import siteConfig from '@/config/siteConfig';

export default function ContactDetails() {
  const { address, phone, email, openingHours } = siteConfig.footer;

  // Format phone number for Indian locale (e.g., +91 20 2729 1111)
  const formatPhoneNumber = (num: string | undefined): string => {
    if (!num) return 'N/A';
    // Assuming the number is like '020 2729 1111' or '919876543210'
    // This is a basic formatter and might need more robust logic for various formats
    const digits = num.replace(/\D/g, ''); // Remove non-digits
    if (digits.length === 10 && digits.startsWith('91')) { // Indian mobile
      return `+${digits.substring(0, 2)} ${digits.substring(2, 7)} ${digits.substring(7)}`;
    } else if (digits.length === 11 && digits.startsWith('0')) { // Indian landline with leading zero
      return `+91 ${digits.substring(1, 3)} ${digits.substring(3, 7)} ${digits.substring(7)}`;
    } else if (digits.length === 10) { // Assume 10-digit Indian number
      return `+91 ${digits.substring(0, 5)} ${digits.substring(5)}`;
    }
    return num; // Return as is if format is unexpected
  };

  const formattedPhone = formatPhoneNumber(phone);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md space-y-6" data-testid="contact-details">
      <h2 className="text-3xl font-bold text-[#36454F] mb-6">Get in Touch</h2>

      {address && (
        <div className="flex items-start space-x-4">
          <MapPin className="text-[#D4AF37] flex-shrink-0 mt-1" size={24} />
          <div>
            <h3 className="text-xl font-semibold text-[#36454F]">Our Location</h3>
            <p className="text-[#36454F] leading-relaxed">{address}</p>
          </div>
        </div>
      )}

      {phone && (
        <div className="flex items-start space-x-4">
          <Phone className="text-[#D4AF37] flex-shrink-0 mt-1" size={24} />
          <div>
            <h3 className="text-xl font-semibold text-[#36454F]">Call Us</h3>
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-[#36454F] hover:text-[#D4AF37] transition-colors duration-200" data-testid="contact-phone-link">
              {formattedPhone}
            </a>
          </div>
        </div>
      )}

      {email && (
        <div className="flex items-start space-x-4">
          <Mail className="text-[#D4AF37] flex-shrink-0 mt-1" size={24} />
          <div>
            <h3 className="text-xl font-semibold text-[#36454F]">Email Us</h3>
            <a href={`mailto:${email}`} className="text-[#36454F] hover:text-[#D4AF37] transition-colors duration-200" data-testid="contact-email-link">
              {email}
            </a>
          </div>
        </div>
      )}

      {openingHours && (
        <div className="flex items-start space-x-4">
          <Clock className="text-[#D4AF37] flex-shrink-0 mt-1" size={24} />
          <div>
            <h3 className="text-xl font-semibold text-[#36454F]">Opening Hours</h3>
            <p className="text-[#36454F] leading-relaxed whitespace-pre-line">{openingHours}</p>
          </div>
        </div>
      )}
    </div>
  );
}