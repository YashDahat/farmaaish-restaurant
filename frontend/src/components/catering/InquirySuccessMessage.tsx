import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/routes';

interface InquirySuccessMessageProps {
  onReset: () => void;
}

export function InquirySuccessMessage({ onReset }: InquirySuccessMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-md border border-gray-100 text-center">
      <CheckCircle className="h-16 w-16 text-[#D4AF37] mb-4" />
      <h3 className="text-2xl md:text-3xl font-semibold text-[#36454F] mb-4">Thank You for Your Inquiry!</h3>
      <p className="text-[#36454F] leading-relaxed mb-6">
        Your catering inquiry has been successfully submitted. Our team will review your request and get in touch with you shortly to discuss the exquisite details of your event. We look forward to crafting a memorable experience for you.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild className="bg-[#D4AF37] hover:bg-[#b8952b] text-white font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="return-home-cta">
          <Link to={ROUTES.HOME}>Return to Home</Link>
        </Button>
        <Button asChild variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-gray-100 font-semibold rounded-full px-8 py-3 transition-all duration-200" data-testid="explore-menu-cta">
          <Link to={ROUTES.MENU}>Explore Menu</Link>
        </Button>
      </div>
    </div>
  );
}