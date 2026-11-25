import { Instagram, MessageCircle } from 'lucide-react';
import { DEALERSHIP_INFO, buildWhatsAppUrl } from '../config/dealership';

const FOOTER_LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Estoque', href: '#estoque' },
  { label: 'Como Comprar', href: '#como-comprar' },
  { label: 'Financiamento', href: '#financiamento' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

export function Footer() {
  const whatsappUrl = buildWhatsAppUrl(
    'Olá! Gostaria de falar com a Coelho Motors.'
  );

  return (
    <footer className="border-t border-white/10 bg-[#0D0D0F] py-12 text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">
          {/* Marca e Endereço */}
          <div className="md:col-span-5">
            <a href="#inicio" className="inline-flex items-center gap-3">
              <img
                src={DEALERSHIP_INFO.logoPath}
                alt="Coelho Motors"
                referrerPolicy="no-referrer"
                className="h-12 w-12 rounded-full object-cover ring-1 ring-white/15"
              />
              <div>
                <div className="font-display text-lg font-extrabold tracking-tight text-white">
                  COELHO <span className="text-[#D9252A]">MOTORS</span>
                </div>
                <div className="text-xs text-zinc-400">
                  {DEALERSHIP_INFO.slogan}
                </div>
              </div>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400">
              {DEALERSHIP_INFO.fullAddress}. Entrada em até 18x no cartão,
              avaliação justa na troca e financiamento facilitado.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Navegação rápida
            </h3>
            <ul className="mt-3 grid grid-cols-2 gap-y-2.5 gap-x-4 text-sm">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes Sociais */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
              Atendimento e redes
            </h3>
            <div className="mt-3 flex flex-col gap-2.5 text-sm">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-zinc-300 transition-colors hover:text-white"
              >
                <MessageCircle
                  className="h-4 w-4 text-[#4ADE80]"
                  aria-hidden="true"
                />
                <span className="tabular-nums">
                  {DEALERSHIP_INFO.phoneFormatted}
                </span>
              </a>

              <a
                href={DEALERSHIP_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-zinc-300 transition-colors hover:text-white"
              >
                <Instagram
                  className="h-4 w-4 text-[#F87171]"
                  aria-hidden="true"
                />
                <span>{DEALERSHIP_INFO.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© Coelho Motors – Todos os direitos reservados</p>
          <p>Responsável: {DEALERSHIP_INFO.owner} · Marília/SP</p>
        </div>
      </div>
    </footer>
  );
}
