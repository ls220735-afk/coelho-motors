import {
  Clock,
  ExternalLink,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { DEALERSHIP_INFO, buildWhatsAppUrl } from '../config/dealership';

export function ContactSection() {
  const whatsappUrl = buildWhatsAppUrl(
    'Olá! Gostaria de agendar uma visita à Coelho Motors na Rua Bahia, 650.'
  );

  return (
    <section
      id="contato"
      className="scroll-mt-20 border-t border-white/10 bg-[#141418] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          {/* Informações de Contato */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F87171]">
                Visite nossa loja
              </p>
              <h2
                className="mt-2 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
                style={{ textWrap: 'balance' }}
              >
                Contato e localização em Marília/SP
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-400">
                Venha tomar um café conosco, conhecer o estoque pessoalmente e
                fazer um test drive.
              </p>

              <dl className="mt-8 space-y-5 border-t border-white/10 pt-6">
                <div className="flex items-start gap-3.5">
                  <MapPin
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#D9252A]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Endereço
                    </dt>
                    <dd className="mt-0.5 text-sm sm:text-base font-medium text-white">
                      {DEALERSHIP_INFO.addressLine1}
                      <span className="block text-sm text-zinc-300">
                        {DEALERSHIP_INFO.addressLine2}
                      </span>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#D9252A]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      WhatsApp e Telefone
                    </dt>
                    <dd className="mt-0.5">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base font-semibold text-white tabular-nums transition-colors hover:text-[#F87171]"
                      >
                        {DEALERSHIP_INFO.phoneFormatted}
                      </a>
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock
                    className="mt-0.5 h-5 w-5 shrink-0 text-[#D9252A]"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Horário de atendimento
                    </dt>
                    <dd className="mt-0.5 text-sm text-zinc-200 tabular-nums">
                      <span className="block">
                        {DEALERSHIP_INFO.hoursWeekdays}
                      </span>
                      <span className="block text-zinc-300">
                        {DEALERSHIP_INFO.hoursSaturday}
                      </span>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#D9252A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#B81D22]"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Chamar no WhatsApp</span>
              </a>

              <a
                href={DEALERSHIP_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/15 bg-[#0D0D0F] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/35"
              >
                <Instagram className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{DEALERSHIP_INFO.instagramHandle}</span>
              </a>
            </div>
          </div>

          {/* Mapa do Google Maps Incorporado */}
          <div className="lg:col-span-7">
            <div className="flex h-full min-h-[340px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0D0D0F]">
              <iframe
                title="Mapa da Coelho Motors - Rua Bahia, 650, Marília/SP"
                src={DEALERSHIP_INFO.googleMapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[320px] w-full flex-1 border-0 grayscale-[20%] contrast-[1.05]"
              />
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-[#0D0D0F] px-5 py-3.5 text-xs sm:text-sm">
                <span className="text-zinc-300">
                  {DEALERSHIP_INFO.fullAddress}
                </span>
                <a
                  href={DEALERSHIP_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-[#F87171] hover:underline"
                >
                  <span>Abrir rota no Google Maps</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
