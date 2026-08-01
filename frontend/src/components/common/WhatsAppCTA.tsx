import { MessageCircle } from 'lucide-react';

const WhatsAppCTA = () => {
  const phoneNumber = '+9102027291111'; // Restaurant's WhatsApp number
  const message = 'Hello Farmaaish Restaurant, I would like to inquire about...'; // Pre-filled message

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-200 z-50"
      aria-label="Chat on WhatsApp"
      data-testid="whatsapp-cta"
    >
      <MessageCircle size={32} />
    </button>
  );
};

export default WhatsAppCTA;