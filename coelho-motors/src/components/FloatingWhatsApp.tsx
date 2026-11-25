import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../config/dealership';

export function FloatingWhatsApp() {
  const whatsappUrl = buildWhatsAppUrl(
    'Olá! Estou no site da Coelho Motors e gostaria de atendimento.'
  );

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp com a Coelho Motors"
      className="fixed bottom-4 right-4 z-40 inline-flex h-14 items-center gap-2.5 rounded-full bg-[#16A34A] px-4 sm:px-5 text-sm font-semibold text-white shadow-[0_10px_30px_-6px_rgba(22,163,74,0.6)] transition-transform duration-150 hover:scale-[1.03] hover:bg-[#15803D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:bottom-6 sm:right-6"
    >
      <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline whitespace-nowrap">WhatsApp</span>
    </a>
  );
}
