import { useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { DEALERSHIP_INFO, buildWhatsAppUrl } from '../config/dealership';

export function Hero() {
  const [heroLoadedError, setHeroLoadedError] = useState(false);

  const whatsappHref = buildWhatsAppUrl(
    'Olá! Vi o site da Coelho Motors e gostaria de falar com um consultor sobre os veículos disponíveis.'
  );

  return (
    <section
      id="inicio"
      className="relative min-h-[88vh] sm:min-h-[82vh] flex items-end sm:items-center overflow-hidden bg-[#0D0D0F] pt-24 pb-14 sm:pt-28 sm:pb-20"
    >
      {/* Imagem de fundo em alta definição com fallback garantido */}
      <div className="absolute inset-0">
        {!heroLoadedError ? (
          <img
            src={DEALERSHIP_INFO.heroImagePath}
            alt="Showroom Coelho Motors com veículos selecionados"
            referrerPolicy="no-referrer"
            onError={() => setHeroLoadedError(true)}
            className="h-full w-full object-cover object-left sm:object-center opacity-70"
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_70%_35%,rgba(217,37,42,0.22),transparent_55%),linear-gradient(135deg,#0D0D0F_0%,#18181F_100%)]" />
        )}

        {/* Gradiente medido para garantir contraste >= 4.5:1 em toda a área de leitura */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0D0D0F] via-[#0D0D0F]/80 to-[#0D0D0F]/55 sm:bg-gradient-to-r sm:from-[#0D0D0F] sm:via-[#0D0D0F]/85 sm:to-[#0D0D0F]/40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0D0D0F] to-transparent"
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          {/* Kicker limpo sem pílulas */}
          <p className="text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-[#F87171]">
            {DEALERSHIP_INFO.slogan} · Marília/SP
          </p>

          <h1
            className="mt-4 font-display font-extrabold tracking-tight text-white leading-[1.08]"
            style={{
              fontSize: 'clamp(2.25rem, 4.8vw, 4rem)',
              textWrap: 'balance',
            }}
          >
            Seu próximo carro está aqui
          </h1>

          <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-zinc-200">
            Seminovos selecionados com procedência garantida, avaliação transparente na troca e{' '}
            <strong className="font-semibold text-white">
              entrada em até 18x no cartão
            </strong>{' '}
            para você sair de carro novo hoje mesmo.
          </p>

          {/* Ações principais com alvos grandes no mobile */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-4">
            <a
              href="#estoque"
              className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full bg-[#D9252A] px-7 py-3.5 text-sm sm:text-base font-semibold text-white whitespace-nowrap shadow-[0_10px_30px_-8px_rgba(217,37,42,0.6)] transition-all duration-150 hover:bg-[#B81D22] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Ver estoque</span>
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </a>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full border border-white/25 bg-[#141418]/80 px-7 py-3.5 text-sm sm:text-base font-semibold text-white whitespace-nowrap backdrop-blur-sm transition-all duration-150 hover:border-white/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D9252A]"
            >
              <MessageCircle className="h-4 w-4 shrink-0 text-[#4ADE80]" aria-hidden="true" />
              <span>Falar no WhatsApp</span>
            </a>
          </div>

          {/* Linha de confiança direta sem caixas repetidas */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/15 pt-5 text-xs sm:text-sm text-zinc-300">
            <span>Rua Bahia, 650 · Marília/SP</span>
            <span aria-hidden="true" className="text-zinc-600">
              ·
            </span>
            <span>Atendimento direto com {DEALERSHIP_INFO.owner}</span>
            <span aria-hidden="true" className="text-zinc-600">
              ·
            </span>
            <span className="tabular-nums">{DEALERSHIP_INFO.phoneFormatted}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
