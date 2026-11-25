import { ArrowUpRight } from 'lucide-react';
import { DEALERSHIP_INFO, buildWhatsAppUrl } from '../config/dealership';

const METRICS = [
  {
    value: '+1.000',
    label: 'Veículos negociados em Marília e região',
  },
  {
    value: '18x',
    label: 'Parcelamento da entrada no cartão de crédito',
  },
  {
    value: '100%',
    label: 'Estoque selecionado com foco em procedência',
  },
  {
    value: '7.500+',
    label: 'Seguidores acompanhando novidades no Instagram',
  },
];

export function AboutSection() {
  const whatsappUrl = buildWhatsAppUrl(
    'Olá Thiago! Vim pelo site da Coelho Motors e gostaria de conversar sobre um veículo.'
  );

  return (
    <section
      id="sobre"
      className="scroll-mt-20 border-t border-white/10 bg-[#141418] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Texto institucional */}
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#F87171]">
              Sobre a Coelho Motors
            </p>
            <h2
              className="mt-2 font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              Confiança, transparência e negócio direto em Marília
            </h2>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-zinc-300">
              À frente da <strong className="text-white">Coelho Motors</strong>,{' '}
              <strong className="text-white">{DEALERSHIP_INFO.owner}</strong>{' '}
              construiu uma loja reconhecida em Marília e região pelo
              atendimento próximo, negociação honesta e veículos selecionados a
              dedo.
            </p>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-400">
              Cada carro que entra em nosso pátio passa por verificação de
              histórico, revisão criteriosa e precificação justa. Seja para
              comprar à vista, trocar seu veículo atual ou financiar com entrada
              em até 18x no cartão, nosso compromisso é entregar segurança do
              início ao fim.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full bg-[#D9252A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#B81D22]"
              >
                <span>Conversar com a loja</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href={DEALERSHIP_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-white/15 bg-[#0D0D0F] px-6 py-3 text-sm font-semibold text-zinc-200 transition-colors hover:border-white/35 hover:text-white"
              >
                <span>Seguir {DEALERSHIP_INFO.instagramHandle}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Métricas de prova social adjacentes */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6">
            {METRICS.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-[#0D0D0F] p-6"
              >
                <div className="font-display text-3xl sm:text-4xl font-extrabold text-white tabular-nums">
                  {metric.value}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
