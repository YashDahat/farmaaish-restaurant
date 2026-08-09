import siteConfig from '@/config/siteConfig';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const whatsappLink = `https://wa.me/${siteConfig.whatsappNumber}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50"
      data-testid="whatsapp-button"
    >
      <Button
        className="rounded-full w-14 h-14 bg-green-500 hover:bg-green-600 text-white shadow-lg transition-all duration-200"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </Button>
    </a>
  );
}