import { motion } from 'motion/react';

const DIFFERENTIALS = [
  {
    index: '01',
    title: 'Entrada em até 18x no cartão',
    description:
      'Facilidade real para dar o primeiro passo sem descapitalizar, com parcelamento direto no cartão de crédito.',
  },
  {
    index: '02',
    title: 'Aceitamos seu carro na troca',
    description:
      'Avaliação justa, rápida e transparente no seu veículo usado como parte do pagamento.',
  },
  {
    index: '03',
    title: 'Financiamento facilitado',
    description:
      'Trabalhamos com os principais bancos e financeiras para buscar a melhor taxa e aprovação ágil.',
  },
  {
    index: '04',
    title: 'Procedência garantida',
    description:
      'Veículos periciados, revisados e com histórico verificado para você comprar com tranquilidade.',
  },
];

export function Differentials() {
  return (
    <section
      aria-label="Diferenciais Coelho Motors"
      className="border-y border-white/10 bg-[#141418]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-y-0 sm:gap-px sm:bg-white/10 lg:grid-cols-4">
          {DIFFERENTIALS.map((item, idx) => (
            <motion.div
              key={item.index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="bg-[#141418] py-7 sm:p-7 lg:p-8"
            >
              <span className="font-mono text-xs font-semibold tracking-wider text-[#D9252A] tabular-nums">
                {item.index}
              </span>
              <h2 className="mt-2 font-display text-base sm:text-lg font-bold text-white leading-snug">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
