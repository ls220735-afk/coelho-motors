import { useEffect, useState } from 'react';
import { Menu, MessageCircle, X } from 'lucide-react';
import { DEALERSHIP_INFO, buildWhatsAppUrl } from '../config/dealership';

const NAV_ITEMS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Estoque', href: '#estoque' },
  { label: 'Como Comprar', href: '#como-comprar' },
  { label: 'Financiamento', href: '#financiamento' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const whatsappHref = buildWhatsAppUrl(
    'Olá! Gostaria de falar com a equipe da Coelho Motors.'
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        scrolled || mobileMenuOpen
          ? 'bg-[#0D0D0F]/95 backdrop-blur-md border-b border-white/10'
          : 'bg-[#0D0D0F]/80 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:gap-8 lg:px-8">
        {/* Zona 1: Logo + Marca (uma linha) */}
        <a
          href="#inicio"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-3 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9252A] rounded-md"
        >
          <img
            src={DEALERSHIP_INFO.logoPath}
            alt="Logo Coelho Motors"
            referrerPolicy="no-referrer"
            className="h-10 w-10 rounded-full object-cover ring-1 ring-white/15 shrink-0"
          />
          <span className="font-display text-base sm:text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0">
            COELHO <span className="text-[#D9252A]">MOTORS</span>
          </span>
        </a>

        {/* Zona 2: Navegação Desktop */}
        <nav
          aria-label="Navegação principal"
          className="hidden lg:flex items-center gap-6 text-sm font-medium text-zinc-300"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#D9252A] after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-none focus-visible:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zona 3: Ação Principal + Botão Mobile */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center gap-2 rounded-full bg-[#D9252A] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#B81D22] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span>Falar no WhatsApp</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="menu-mobile"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-[#141418] text-white lg:hidden transition-colors hover:border-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9252A]"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <div
          id="menu-mobile"
          className="border-t border-white/10 bg-[#0D0D0F] px-4 pb-6 pt-3 lg:hidden"
        >
          <nav aria-label="Menu mobile" className="flex flex-col divide-y divide-white/5">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center justify-between py-2.5 text-base font-medium text-zinc-200 transition-colors hover:text-white"
              >
                <span>{item.label}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#D9252A]/70" aria-hidden="true" />
              </a>
            ))}
          </nav>

          <div className="mt-4 pt-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#D9252A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#B81D22]"
            >
              <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
